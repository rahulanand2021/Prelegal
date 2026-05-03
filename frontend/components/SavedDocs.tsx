'use client';

import { useEffect, useState } from 'react';
import { CATALOG, CatalogEntry } from '@/lib/catalog';
import { DocumentData } from '@/lib/types';
import { authHeaders, clearAuth } from '@/lib/auth';

interface SavedDoc {
  id: number;
  doc_type: string;
  doc_name: string;
  fields: DocumentData;
  updated_at: string;
}

interface Props {
  onOpen: (doc: CatalogEntry, fields: DocumentData, docId: number) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SavedDocs({ onOpen }: Props) {
  const [docs, setDocs] = useState<SavedDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/documents', { headers: authHeaders() })
      .then(r => {
        if (r.status === 401) { clearAuth(); window.location.href = '/'; return null; }
        if (!r.ok) throw new Error('Failed to load documents');
        return r.json();
      })
      .then(data => { if (data) setDocs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleOpen = (doc: SavedDoc) => {
    const entry = CATALOG.find(c => c.name === doc.doc_type);
    if (entry) onOpen(entry, doc.fields, doc.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-2 w-2 rounded-full bg-gray-300 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-1">No saved documents yet</p>
        <p className="text-xs" style={{ color: '#888888' }}>
          Start drafting a document and it will be auto-saved here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {docs.map(doc => (
        <button
          key={doc.id}
          onClick={() => handleOpen(doc)}
          className="text-left rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-300 focus:outline-none focus:ring-2 active:scale-[0.98]"
          style={{ '--tw-ring-color': '#209dd7' } as React.CSSProperties}
        >
          <div
            className="mb-2 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: '#753991' }}
          >
            {doc.doc_type.charAt(0)}
          </div>
          <h3 className="text-sm font-semibold leading-snug mb-1" style={{ color: '#032147' }}>
            {doc.doc_name}
          </h3>
          <p className="text-xs" style={{ color: '#888888' }}>
            Updated {formatDate(doc.updated_at)}
          </p>
        </button>
      ))}
    </div>
  );
}
