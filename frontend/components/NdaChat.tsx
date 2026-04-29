'use client';

import { useEffect, useRef, useState } from 'react';
import { NdaFormData } from '@/lib/types';

interface Props {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INIT_USER_MSG: Message = {
  role: 'user',
  content: 'Hello, I need help drafting a Mutual NDA.',
};

function applyFields(current: NdaFormData, fields: Record<string, unknown>): NdaFormData {
  const next = { ...current };
  for (const [key, val] of Object.entries(fields)) {
    if (val === null || val === undefined) continue;
    if (key === 'party1' || key === 'party2') {
      (next as Record<string, unknown>)[key] = {
        ...current[key as 'party1' | 'party2'],
        ...(val as object),
      };
    } else {
      (next as Record<string, unknown>)[key] = val;
    }
  }
  return next;
}

export default function NdaChat({ data, onChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef(data);
  const apiHistoryRef = useRef<Message[]>([]);
  const initialized = useRef(false);
  dataRef.current = data;

  const callApi = async (newUserMsg?: Message) => {
    if (newUserMsg) {
      apiHistoryRef.current = [...apiHistoryRef.current, newUserMsg];
    }
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiHistoryRef.current,
          current_data: dataRef.current,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const assistantMsg: Message = { role: 'assistant', content: json.message };
      apiHistoryRef.current = [...apiHistoryRef.current, assistantMsg];
      setMessages(prev => [...prev, assistantMsg]);
      if (json.fields) {
        onChange(applyFields(dataRef.current, json.fields as Record<string, unknown>));
      }
    } catch {
      const errMsg: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    apiHistoryRef.current = [INIT_USER_MSG];
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
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#ecad0a' }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Prelegal</span>
        </div>
        <h1 className="text-xl font-semibold" style={{ color: '#032147' }}>Mutual NDA Creator</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#888888' }}>Chat with AI to draft your agreement</p>
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
