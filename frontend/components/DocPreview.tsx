'use client';

import { useEffect, useState } from 'react';
import { CatalogEntry, DOCUMENT_FIELDS, FieldDef } from '@/lib/catalog';
import { DocumentData } from '@/lib/types';

interface Props {
  document: CatalogEntry;
  data: DocumentData;
}

// Matches all field-reference span classes in the templates
const FIELD_SPAN_RE = /<span class="(?:coverpage|keyterms|businessterms|orderform|sow)_link"[^>]*>([^<]+)<\/span>/g;
// Matches section heading spans (styled, not substituted)
const HEADER2_RE = /<span class="header_2"[^>]*>(.*?)<\/span>/g;
const HEADER3_RE = /<span class="header_3"[^>]*>(.*?)<\/span>/g;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildLabelMap(docName: string, data: DocumentData): Record<string, string> {
  const fields = DOCUMENT_FIELDS[docName] || [];
  const map: Record<string, string> = {};

  for (const field of fields) {
    if (field.type === 'object') continue;
    const value = data[field.key];
    if (value === null || value === undefined || String(value).trim() === '') continue;
    map[field.label] = field.type === 'date' ? formatDate(String(value)) : escapeHtml(String(value));
  }

  // NDA: computed multi-field labels used in standard terms spans
  if (docName === 'Mutual Non-Disclosure Agreement') {
    const mt = data.mndaTermType as string;
    const my = data.mndaTermYears as number;
    if (mt === 'expires' && my) map['MNDA Term'] = `${my} year(s) from the Effective Date`;
    else if (mt === 'until_terminated') map['MNDA Term'] = 'until terminated';

    const ct = data.confidentialityTermType as string;
    const cy = data.confidentialityTermYears as number;
    if (ct === 'years' && cy) map['Term of Confidentiality'] = `${cy} year(s) from the Effective Date`;
    else if (ct === 'perpetuity') map['Term of Confidentiality'] = 'in perpetuity';
  }

  return map;
}

function substituteFields(template: string, labelMap: Record<string, string>): string {
  return template.replace(FIELD_SPAN_RE, (_, label) => {
    const trimmed = label.trim();
    const value = labelMap[trimmed];
    return value
      ? `<span style="font-weight:600;color:#111827">${value}</span>`
      : `<span style="font-style:italic;color:#d1d5db">[${trimmed}]</span>`;
  });
}

function styleHeadings(html: string): string {
  return html
    .replace(HEADER2_RE, '<strong style="font-weight:700;text-transform:uppercase;letter-spacing:0.04em;font-size:0.85em">$1</strong>')
    .replace(HEADER3_RE, '<strong style="font-weight:700">$1</strong>');
}

async function markdownToHtml(md: string): Promise<string> {
  const { marked } = await import('marked');
  marked.setOptions({ gfm: true });
  const raw = await marked.parse(md);
  return styleHeadings(raw);
}

interface PartyInfo {
  name?: string;
  title?: string;
  company?: string;
  noticeAddress?: string;
  date?: string;
}

function PartySection({ label, party }: { label: string; party: PartyInfo }) {
  const rows: { label: string; value?: string }[] = [
    { label: 'Name', value: party.name },
    { label: 'Title', value: party.title },
    { label: 'Company', value: party.company },
    { label: 'Notice Address', value: party.noticeAddress },
    { label: 'Date', value: party.date ? formatDate(party.date) : '' },
  ];
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '5px', color: '#374151' }}>{label}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <td style={{ padding: '2px 8px 2px 0', color: '#9ca3af', width: '38%', verticalAlign: 'top' }}>{r.label}</td>
              <td style={{ padding: '2px 0', color: r.value ? '#111827' : '#d1d5db', fontStyle: r.value ? 'normal' : 'italic' }}>
                {r.value || `[${r.label}]`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocPreview({ document, data }: Props) {
  const [templateContent, setTemplateContent] = useState('');
  const [renderedHtml, setRenderedHtml] = useState('');
  const [loadingTemplate, setLoadingTemplate] = useState(true);

  // Fetch template on document change
  useEffect(() => {
    setLoadingTemplate(true);
    setTemplateContent('');
    const files = (document.allTemplates ?? [document.filename]).join(',');
    fetch(`/api/template?files=${encodeURIComponent(files)}`)
      .then(r => r.json())
      .then(j => { setTemplateContent(j.content ?? ''); setLoadingTemplate(false); })
      .catch(() => setLoadingTemplate(false));
  }, [document.name]);

  // Re-render HTML whenever template or data changes
  useEffect(() => {
    if (!templateContent) return;
    const labelMap = buildLabelMap(document.name, data);
    const substituted = substituteFields(templateContent, labelMap);
    markdownToHtml(substituted).then(setRenderedHtml);
  }, [templateContent, data, document.name]);

  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const el = window.document.getElementById('doc-preview-content');
    if (!el) return;
    await html2pdf()
      .set({
        margin: [0.75, 0.75, 0.75, 0.75],
        filename: `${document.name.toLowerCase().replace(/[\s/]+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(el)
      .save();
  };

  const fields = DOCUMENT_FIELDS[document.name] ?? [];
  const scalarFields = fields.filter((f: FieldDef) => f.type !== 'object');
  const hasParties = fields.some((f: FieldDef) => f.key === 'party1');
  const party1 = (data.party1 as PartyInfo) ?? {};
  const party2 = (data.party2 as PartyInfo) ?? {};

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
          id="doc-preview-content"
          style={{ padding: '28px 48px', fontFamily: 'Georgia, "Times New Roman", serif', color: '#111827' }}
        >
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
            {document.name}
          </h1>

          {/* Key Terms panel */}
          <div style={{ marginBottom: '24px', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', color: '#6b7280' }}>
              Key Terms
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <tbody>
                {scalarFields.map((field: FieldDef) => {
                  const value = data[field.key];
                  const display = field.type === 'date' && value ? formatDate(String(value)) : String(value ?? '');
                  return (
                    <tr key={field.key}>
                      <td style={{ padding: '3px 12px 3px 0', color: '#6b7280', width: '30%', verticalAlign: 'top' }}>{field.label}</td>
                      <td style={{ padding: '3px 0', color: display ? '#111827' : '#d1d5db', fontStyle: display ? 'normal' : 'italic' }}>
                        {display || `[${field.label}]`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {hasParties && (
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e5e7eb' }}>
                <PartySection label="Party 1" party={party1} />
                <PartySection label="Party 2" party={party2} />
              </div>
            )}
          </div>

          {/* Document body */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            {loadingTemplate ? (
              <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '12px' }}>Loading document…</p>
            ) : (
              <div
                style={{ fontSize: '12px', lineHeight: '1.7', color: '#374151' }}
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
