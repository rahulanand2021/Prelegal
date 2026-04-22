'use client';

import { NdaFormData, PartyInfo } from '@/lib/types';

interface Props {
  data: NdaFormData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function Blank({ value, placeholder }: { value: string; placeholder: string }) {
  return value ? (
    <span style={{ color: '#111827' }}>{value}</span>
  ) : (
    <span style={{ fontStyle: 'italic', color: '#d1d5db' }}>[{placeholder}]</span>
  );
}

function CheckRow({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px', fontSize: '12px', color: '#374151' }}>
      <span style={{ flexShrink: 0, marginTop: '1px' }}>{checked ? '☑' : '☐'}</span>
      <span>{label}</span>
    </div>
  );
}

function Section({ title, label, children }: { title: string; label?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '16px', borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: label ? '2px' : '8px' }}>{title}</h3>
      {label && (
        <p style={{ fontSize: '10px', fontStyle: 'italic', color: '#6b7280', marginBottom: '6px' }}>{label}</p>
      )}
      {children}
    </div>
  );
}

const SIG_ROWS: { label: string; key: keyof PartyInfo; isDate?: boolean }[] = [
  { label: 'Print Name', key: 'name' },
  { label: 'Title', key: 'title' },
  { label: 'Company', key: 'company' },
  { label: 'Notice Address', key: 'noticeAddress' },
  { label: 'Date', key: 'date', isDate: true },
];

export default function NdaPreview({ data }: Props) {
  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('nda-doc');
    if (!element) return;
    await html2pdf()
      .set({
        margin: [0.75, 0.75, 0.75, 0.75],
        filename: 'mutual-nda.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  const p1Company = data.party1.company ? ` — ${data.party1.company}` : '';
  const p2Company = data.party2.company ? ` — ${data.party2.company}` : '';

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Preview</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700 active:bg-gray-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div
          id="nda-doc"
          style={{ padding: '48px 56px', fontFamily: 'Georgia, "Times New Roman", serif', color: '#111827' }}
        >
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '0' }}>
            Mutual Non-Disclosure Agreement
          </h1>

          <div style={{ marginTop: '24px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Using This Mutual Non-Disclosure Agreement
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.65', color: '#374151' }}>
              This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("Cover Page") and
              (2) the Common Paper Mutual NDA Standard Terms Version 1.0 ("Standard Terms") identical to those posted
              at <span style={{ textDecoration: 'underline' }}>commonpaper.com/standards/mutual-nda/1.0</span>.
              Any modifications of the Standard Terms should be made on the Cover Page, which will control over
              conflicts with the Standard Terms.
            </p>
          </div>

          <Section title="Purpose" label="How Confidential Information may be used">
            <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6' }}>
              <Blank value={data.purpose} placeholder="Purpose" />
            </p>
          </Section>

          <Section title="Effective Date">
            <p style={{ fontSize: '12px', color: '#374151' }}>
              <Blank value={formatDate(data.effectiveDate)} placeholder="Today's date" />
            </p>
          </Section>

          <Section title="MNDA Term" label="The length of this MNDA">
            <CheckRow
              checked={data.mndaTermType === 'expires'}
              label={`Expires ${data.mndaTermYears} year(s) from Effective Date.`}
            />
            <CheckRow
              checked={data.mndaTermType === 'until_terminated'}
              label="Continues until terminated in accordance with the terms of the MNDA."
            />
          </Section>

          <Section title="Term of Confidentiality" label="How long Confidential Information is protected">
            <CheckRow
              checked={data.confidentialityTermType === 'years'}
              label={`${data.confidentialityTermYears} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`}
            />
            <CheckRow
              checked={data.confidentialityTermType === 'perpetuity'}
              label="In perpetuity."
            />
          </Section>

          <Section title="Governing Law & Jurisdiction">
            <p style={{ fontSize: '12px', color: '#374151', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600 }}>Governing Law: </span>
              <Blank value={data.governingLaw} placeholder="State" />
            </p>
            <p style={{ fontSize: '12px', color: '#374151' }}>
              <span style={{ fontWeight: 600 }}>Jurisdiction: </span>
              <Blank value={data.jurisdiction} placeholder="City or county and state" />
            </p>
          </Section>

          <Section title="MNDA Modifications">
            <p style={{ fontSize: '12px', color: '#374151', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {data.modifications ? (
                data.modifications
              ) : (
                <span style={{ fontStyle: 'italic', color: '#9ca3af' }}>None.</span>
              )}
            </p>
          </Section>

          <div style={{ marginTop: '20px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
            <p style={{ fontSize: '12px', color: '#374151', marginBottom: '16px' }}>
              By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ width: '22%', padding: '6px 8px 6px 0', textAlign: 'left', fontWeight: 400 }} />
                  <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: 600, border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                    Party 1{p1Company}
                  </th>
                  <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: 600, border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                    Party 2{p2Company}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '6px 8px 6px 0', color: '#6b7280', verticalAlign: 'top', fontSize: '11px' }}>Signature</td>
                  <td style={{ padding: '28px 10px 8px', border: '1px solid #e5e7eb' }} />
                  <td style={{ padding: '28px 10px 8px', border: '1px solid #e5e7eb' }} />
                </tr>
                {SIG_ROWS.map(row => {
                  const p1Raw = data.party1[row.key];
                  const p2Raw = data.party2[row.key];
                  const p1Value = row.isDate ? formatDate(p1Raw) : p1Raw;
                  const p2Value = row.isDate ? formatDate(p2Raw) : p2Raw;
                  return (
                    <tr key={row.label}>
                      <td style={{ padding: '6px 8px 6px 0', color: '#6b7280', verticalAlign: 'top', fontSize: '11px' }}>
                        {row.label}
                      </td>
                      <td style={{ padding: '6px 10px', border: '1px solid #e5e7eb', verticalAlign: 'top', whiteSpace: 'pre-wrap' }}>
                        <Blank value={p1Value} placeholder={row.label} />
                      </td>
                      <td style={{ padding: '6px 10px', border: '1px solid #e5e7eb', verticalAlign: 'top', whiteSpace: 'pre-wrap' }}>
                        <Blank value={p2Value} placeholder={row.label} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '32px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
              Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under CC BY 4.0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
