'use client';

import { useEffect, useRef, useState } from 'react';
import { CatalogEntry } from '@/lib/catalog';
import { DocumentData } from '@/lib/types';
import { authHeaders } from '@/lib/auth';

interface Props {
  document: CatalogEntry;
  data: DocumentData;
  onChange: (data: DocumentData) => void;
  onChangeDocument: () => void;
  email: string;
  onLogout: () => void;
  initialDocId?: number | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function applyFields(current: DocumentData, fields: Record<string, unknown>): DocumentData {
  const next = { ...current };
  for (const [key, val] of Object.entries(fields)) {
    if (val === null || val === undefined) continue;
    if (typeof val === 'object' && !Array.isArray(val)) {
      next[key] = { ...(current[key] as object | undefined), ...(val as object) };
    } else {
      next[key] = val;
    }
  }
  return next;
}

export default function DocChat({ document, data, onChange, onChangeDocument, email, onLogout, initialDocId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const bottomRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef(data);
  const apiHistoryRef = useRef<Message[]>([]);
  const initialized = useRef(false);
  const docIdRef = useRef<number | null>(initialDocId ?? null);
  const saveInFlightRef = useRef(false);
  dataRef.current = data;

  const saveDoc = async (fields: DocumentData) => {
    if (saveInFlightRef.current) return;
    saveInFlightRef.current = true;
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          doc_id: docIdRef.current,
          doc_type: document.name,
          doc_name: document.name,
          fields,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        docIdRef.current = json.id;
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('idle');
      }
    } catch {
      setSaveStatus('idle');
    } finally {
      saveInFlightRef.current = false;
    }
  };

  const callApi = async (newUserMsg?: Message) => {
    if (newUserMsg) {
      apiHistoryRef.current = [...apiHistoryRef.current, newUserMsg];
    }
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          messages: apiHistoryRef.current,
          current_data: dataRef.current,
          document_type: document.name,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const assistantMsg: Message = { role: 'assistant', content: json.message };
      apiHistoryRef.current = [...apiHistoryRef.current, assistantMsg];
      setMessages(prev => [...prev, assistantMsg]);
      if (json.fields) {
        const updated = applyFields(dataRef.current, json.fields as Record<string, unknown>);
        onChange(updated);
        saveDoc(updated);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const initMsg: Message = {
      role: 'user',
      content: initialDocId
        ? `I'm resuming a previously saved draft of a ${document.name}. The fields already filled in are shown in the preview. Please continue helping me refine the document.`
        : `Hello, I need help drafting a ${document.name}.`,
    };
    apiHistoryRef.current = [initMsg];
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    callApi(userMsg);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#ecad0a' }} />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Prelegal</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="truncate max-w-[130px]" style={{ color: '#888888' }}>{email}</span>
            <span className="text-gray-300">·</span>
            <button onClick={onLogout} className="hover:underline flex-shrink-0" style={{ color: '#888888' }}>
              Sign out
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold leading-snug" style={{ color: '#032147' }}>{document.name}</h1>
            <p className="mt-0.5 text-sm" style={{ color: '#888888' }}>Chat with AI to draft your agreement</p>
          </div>
          <div className="flex items-center gap-2 text-xs flex-shrink-0 mt-1">
            {saveStatus === 'saving' && <span style={{ color: '#888888' }}>Saving…</span>}
            {saveStatus === 'saved' && <span style={{ color: '#209dd7' }}>Saved</span>}
            {saveStatus === 'idle' && (
              <button
                onClick={() => saveDoc(dataRef.current)}
                className="font-medium hover:underline"
                style={{ color: '#209dd7' }}
              >
                Save
              </button>
            )}
            <span className="text-gray-300">·</span>
            <button
              onClick={onChangeDocument}
              className="font-medium hover:underline"
              style={{ color: '#209dd7' }}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap"
              style={
                m.role === 'user'
                  ? { backgroundColor: '#753991', color: '#fff' }
                  : { backgroundColor: '#f3f4f6', color: '#111827' }
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-gray-100 flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-100 px-4 py-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
          placeholder={loading ? 'Waiting for response…' : 'Type your response…'}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors"
          style={{ '--tw-ring-color': '#209dd7' } as React.CSSProperties}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: '#753991' }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
