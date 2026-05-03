'use client';

import { useState } from 'react';
import { CATALOG, CatalogEntry } from '@/lib/catalog';
import { DocumentData } from '@/lib/types';
import SavedDocs from '@/components/SavedDocs';

interface Props {
  email: string;
  onLogout: () => void;
  onSelect: (doc: CatalogEntry) => void;
  onOpenSaved: (doc: CatalogEntry, fields: DocumentData, docId: number) => void;
}

type Tab = 'new' | 'saved';

export default function DocSelector({ email, onLogout, onSelect, onOpenSaved }: Props) {
  const [tab, setTab] = useState<Tab>('new');

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#ecad0a' }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Prelegal</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs truncate max-w-[180px]" style={{ color: '#888888' }}>{email}</span>
              <button
                onClick={onLogout}
                className="text-xs font-medium hover:underline flex-shrink-0"
                style={{ color: '#209dd7' }}
              >
                Sign out
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-semibold" style={{ color: '#032147' }}>
            {tab === 'new' ? 'Choose a document to draft' : 'My Documents'}
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#888888' }}>
            {tab === 'new'
              ? 'Select a document type to get started. An AI assistant will guide you through the details.'
              : 'Continue working on a previously saved draft.'}
          </p>
        </div>

        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {(['new', 'saved'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 text-sm font-medium transition-colors"
              style={
                tab === t
                  ? { color: '#032147', borderBottom: '2px solid #209dd7', marginBottom: '-1px' }
                  : { color: '#888888' }
              }
            >
              {t === 'new' ? 'New Document' : 'My Documents'}
            </button>
          ))}
        </div>

        {tab === 'new' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATALOG.map((doc) => (
              <button
                key={doc.name}
                onClick={() => onSelect(doc)}
                className="text-left rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-300 focus:outline-none focus:ring-2 active:scale-[0.98]"
                style={{ '--tw-ring-color': '#209dd7' } as React.CSSProperties}
              >
                <div
                  className="mb-2 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: '#209dd7' }}
                >
                  {doc.name.charAt(0)}
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-1" style={{ color: '#032147' }}>
                  {doc.name}
                </h3>
                <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#888888' }}>
                  {doc.description}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <SavedDocs onOpen={onOpenSaved} />
        )}
      </div>
    </div>
  );
}
