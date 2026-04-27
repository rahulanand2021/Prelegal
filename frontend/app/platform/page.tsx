'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NdaForm from '@/components/NdaForm';
import NdaPreview from '@/components/NdaPreview';
import { NdaFormData, defaultFormData } from '@/lib/types';

export default function PlatformPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('prelegal_user')) {
      router.push('/');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="w-2/5 min-w-80 overflow-y-auto border-r border-gray-200 bg-white shadow-sm">
        <NdaForm data={formData} onChange={setFormData} />
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
        <NdaPreview data={formData} />
      </div>
    </div>
  );
}
