'use client';

import { useState } from 'react';
import NdaForm from '@/components/NdaForm';
import NdaPreview from '@/components/NdaPreview';
import { NdaFormData, defaultFormData } from '@/lib/types';

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);

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
