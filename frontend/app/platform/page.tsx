'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DocSelector from '@/components/DocSelector';
import DocChat from '@/components/DocChat';
import DocPreview from '@/components/DocPreview';
import { CatalogEntry } from '@/lib/catalog';
import { DocumentData } from '@/lib/types';

export default function PlatformPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<CatalogEntry | null>(null);
  const [formData, setFormData] = useState<DocumentData>({});

  useEffect(() => {
    if (!localStorage.getItem('prelegal_user')) {
      router.push('/');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  if (!selected) {
    return <DocSelector onSelect={(doc) => { setSelected(doc); setFormData({}); }} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="w-2/5 min-w-80 flex flex-col border-r border-gray-200 bg-white shadow-sm">
        <DocChat
          document={selected}
          data={formData}
          onChange={setFormData}
          onChangeDocument={() => setSelected(null)}
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
        <DocPreview document={selected} data={formData} />
      </div>
    </div>
  );
}
