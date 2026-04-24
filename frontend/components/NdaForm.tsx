'use client';

import { NdaFormData, PartyInfo } from '@/lib/types';

interface Props {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

const inputCls =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors';
const textareaCls = `${inputCls} resize-none`;
const numInputCls =
  'w-16 rounded-md border border-gray-300 px-2 py-1 text-sm text-center focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 mb-4 border-t border-gray-100 pt-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
      {children}
    </p>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const PARTY_FIELDS: { key: keyof PartyInfo; label: string; type: 'text' | 'textarea' | 'date' }[] = [
  { key: 'name', label: 'Print Name', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'noticeAddress', label: 'Notice Address', type: 'textarea' },
  { key: 'date', label: 'Date', type: 'date' },
];

export default function NdaForm({ data, onChange }: Props) {
  const update = (patch: Partial<NdaFormData>) => onChange({ ...data, ...patch });
  const updateParty = (party: 'party1' | 'party2', patch: Partial<PartyInfo>) =>
    update({ [party]: { ...data[party], ...patch } });

  return (
    <div className="p-6 pb-16">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-900" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Prelegal</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Mutual NDA Creator</h1>
        <p className="mt-0.5 text-sm text-gray-500">Fill in the details to generate your agreement</p>
      </div>

      <SectionLabel>Agreement Details</SectionLabel>

      <Field label="Purpose">
        <textarea
          className={textareaCls}
          rows={3}
          value={data.purpose}
          onChange={e => update({ purpose: e.target.value })}
          placeholder="How Confidential Information may be used"
        />
      </Field>

      <Field label="Effective Date">
        <input
          type="date"
          className={inputCls}
          value={data.effectiveDate}
          onChange={e => update({ effectiveDate: e.target.value })}
        />
      </Field>

      <SectionLabel>Duration</SectionLabel>

      <Field label="MNDA Term">
        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              className="accent-gray-900"
              name="mndaTermType"
              checked={data.mndaTermType === 'expires'}
              onChange={() => update({ mndaTermType: 'expires' })}
            />
            <span>Expires after</span>
            <input
              type="number"
              min={1}
              max={20}
              className={numInputCls}
              value={data.mndaTermYears}
              disabled={data.mndaTermType !== 'expires'}
              onChange={e => update({ mndaTermYears: Math.max(1, Number(e.target.value)) })}
            />
            <span>year(s)</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              className="accent-gray-900"
              name="mndaTermType"
              checked={data.mndaTermType === 'until_terminated'}
              onChange={() => update({ mndaTermType: 'until_terminated' })}
            />
            <span>Until terminated</span>
          </label>
        </div>
      </Field>

      <Field label="Term of Confidentiality">
        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              className="accent-gray-900"
              name="confidentialityTermType"
              checked={data.confidentialityTermType === 'years'}
              onChange={() => update({ confidentialityTermType: 'years' })}
            />
            <input
              type="number"
              min={1}
              max={20}
              className={numInputCls}
              value={data.confidentialityTermYears}
              disabled={data.confidentialityTermType !== 'years'}
              onChange={e => update({ confidentialityTermYears: Math.max(1, Number(e.target.value)) })}
            />
            <span>year(s) from Effective Date</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              className="accent-gray-900"
              name="confidentialityTermType"
              checked={data.confidentialityTermType === 'perpetuity'}
              onChange={() => update({ confidentialityTermType: 'perpetuity' })}
            />
            <span>In perpetuity</span>
          </label>
        </div>
      </Field>

      <SectionLabel>Governing Law</SectionLabel>

      <Field label="State">
        <input
          type="text"
          className={inputCls}
          value={data.governingLaw}
          onChange={e => update({ governingLaw: e.target.value })}
          placeholder="e.g. Delaware"
        />
      </Field>

      <Field label="Jurisdiction">
        <input
          type="text"
          className={inputCls}
          value={data.jurisdiction}
          onChange={e => update({ jurisdiction: e.target.value })}
          placeholder="e.g. courts located in New Castle, DE"
        />
      </Field>

      <SectionLabel>Modifications</SectionLabel>

      <Field label="MNDA Modifications">
        <textarea
          className={textareaCls}
          rows={3}
          value={data.modifications}
          onChange={e => update({ modifications: e.target.value })}
          placeholder="List any modifications, or leave blank for none"
        />
      </Field>

      {(['party1', 'party2'] as const).map((party, i) => (
        <div key={party}>
          <SectionLabel>Party {i + 1}</SectionLabel>
          {PARTY_FIELDS.map(({ key, label, type }) => (
            <Field key={key} label={label}>
              {type === 'textarea' ? (
                <textarea
                  className={textareaCls}
                  rows={2}
                  value={data[party][key]}
                  onChange={e => updateParty(party, { [key]: e.target.value })}
                  placeholder="Email or postal address"
                />
              ) : (
                <input
                  type={type}
                  className={inputCls}
                  value={data[party][key]}
                  onChange={e => updateParty(party, { [key]: e.target.value })}
                  placeholder={label}
                />
              )}
            </Field>
          ))}
        </div>
      ))}
    </div>
  );
}
