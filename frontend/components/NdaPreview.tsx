'use client';

import { NdaFormData, PartyInfo } from '@/lib/types';

interface Props {
  data: NdaFormData;
}

// Renders a cover page value inline within standard terms text
function Ref({ value, placeholder }: { value: string; placeholder: string }) {
  return value ? (
    <span style={{ fontWeight: 600 }}>{value}</span>
  ) : (
    <span style={{ fontStyle: 'italic', color: '#d1d5db' }}>[{placeholder}]</span>
  );
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
        pagebreak: { mode: ['css', 'legacy'], before: '.page-break' },
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

          {/* Standard Terms — page break before this section in the PDF */}
          <div
            className="page-break"
            style={{ pageBreakBefore: 'always', marginTop: '48px', paddingTop: '0' }}
          >
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
              Standard Terms
            </h1>

            {[
              {
                n: 1,
                title: 'Introduction',
                body: (
                  <>
                    This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) ("<strong>MNDA</strong>") allows each party ("<strong>Disclosing Party</strong>") to disclose or make available information in connection with the <Ref value={data.purpose} placeholder="Purpose" /> which (1) the Disclosing Party identifies to the receiving party ("<strong>Receiving Party</strong>") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("<strong>Confidential Information</strong>"). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms ("<strong>Cover Page</strong>"). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page.
                  </>
                ),
              },
              {
                n: 2,
                title: 'Use and Protection of Confidential Information',
                body: (
                  <>
                    The Receiving Party shall: (a) use Confidential Information solely for the <Ref value={data.purpose} placeholder="Purpose" />; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the <Ref value={data.purpose} placeholder="Purpose" />, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.
                  </>
                ),
              },
              {
                n: 3,
                title: 'Exceptions',
                body: (
                  <>
                    The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.
                  </>
                ),
              },
              {
                n: 4,
                title: 'Disclosures Required by Law',
                body: (
                  <>
                    The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.
                  </>
                ),
              },
              {
                n: 5,
                title: 'Term and Termination',
                body: (
                  <>
                    This MNDA commences on the <Ref value={formatDate(data.effectiveDate)} placeholder="Effective Date" /> and expires at the end of the{' '}
                    {data.mndaTermType === 'expires'
                      ? <Ref value={`${data.mndaTermYears} year(s) from the Effective Date`} placeholder="MNDA Term" />
                      : <Ref value="the date of termination" placeholder="MNDA Term" />
                    }. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for{' '}
                    {data.confidentialityTermType === 'years'
                      ? <Ref value={`${data.confidentialityTermYears} year(s) from the Effective Date`} placeholder="Term of Confidentiality" />
                      : <Ref value="in perpetuity" placeholder="Term of Confidentiality" />
                    }, despite any expiration or termination of this MNDA.
                  </>
                ),
              },
              {
                n: 6,
                title: 'Return or Destruction of Confidential Information',
                body: (
                  <>
                    Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.
                  </>
                ),
              },
              {
                n: 7,
                title: 'Proprietary Rights',
                body: (
                  <>
                    The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.
                  </>
                ),
              },
              {
                n: 8,
                title: 'Disclaimer',
                body: (
                  <>
                    ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                  </>
                ),
              },
              {
                n: 9,
                title: 'Governing Law and Jurisdiction',
                body: (
                  <>
                    This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of <Ref value={data.governingLaw} placeholder="Governing Law" />, without regard to the conflict of laws provisions of such <Ref value={data.governingLaw} placeholder="Governing Law" />. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in <Ref value={data.jurisdiction} placeholder="Jurisdiction" />. Each party irrevocably submits to the exclusive jurisdiction of such <Ref value={data.jurisdiction} placeholder="Jurisdiction" /> in any such suit, action, or proceeding.
                  </>
                ),
              },
              {
                n: 10,
                title: 'Equitable Relief',
                body: (
                  <>
                    A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.
                  </>
                ),
              },
              {
                n: 11,
                title: 'General',
                body: (
                  <>
                    Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.
                  </>
                ),
              },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ marginBottom: '14px', fontSize: '12px', lineHeight: '1.65', color: '#374151' }}>
                <span style={{ fontWeight: 700 }}>{n}. {title}. </span>
                {body}
              </div>
            ))}

            <div style={{ marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
                Common Paper Mutual Non-Disclosure Agreement{' '}
                <span style={{ textDecoration: 'underline' }}>Version 1.0</span>{' '}
                free to use under CC BY 4.0.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
