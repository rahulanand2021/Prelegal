'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DocSelector from '@/components/DocSelector';
import DocChat from '@/components/DocChat';
import DocPreview from '@/components/DocPreview';
import { CatalogEntry } from '@/lib/catalog';
import { DocumentData } from '@/lib/types';
import { isAuthenticated, getEmail, clearAuth, authHeaders } from '@/lib/auth';

export default function PlatformPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState<CatalogEntry | null>(null);
  const [formData, setFormData] = useState<DocumentData>({});
  const [docId, setDocId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    } else {
      setEmail(getEmail() || '');
      setReady(true);
    }
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/signout', { method: 'POST', headers: authHeaders() });
    clearAuth();
    router.push('/');
  };

  if (!ready) return null;

  if (!selected) {
    return (
      <DocSelector
        email={email}
        onLogout={handleLogout}
        onSelect={(doc) => { setSelected(doc); setFormData({}); setDocId(null); }}
        onOpenSaved={(doc, fields, id) => { setSelected(doc); setFormData(fields); setDocId(id); }}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="w-2/5 min-w-80 flex flex-col border-r border-gray-200 bg-white shadow-sm">
        <DocChat
          document={selected}
          data={formData}
          onChange={setFormData}
          onChangeDocument={() => { setSelected(null); setDocId(null); }}
          email={email}
          onLogout={handleLogout}
          initialDocId={docId}
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
        <DocPreview document={selected} data={formData} />
      </div>
    </div>
  );
}
