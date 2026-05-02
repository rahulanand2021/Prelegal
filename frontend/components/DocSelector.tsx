'use client';

import { CATALOG, CatalogEntry } from '@/lib/catalog';

interface Props {
  onSelect: (doc: CatalogEntry) => void;
}

export default function DocSelector({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#ecad0a' }} />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Prelegal</span>
          </div>
          <h1 className="text-2xl font-semibold" style={{ color: '#032147' }}>
            Choose a document to draft
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#888888' }}>
            Select a document type to get started. An AI assistant will guide you through the details.
          </p>
        </div>

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
      </div>
    </div>
  );
}
