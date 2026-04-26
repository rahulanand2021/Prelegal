import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NdaPreview from '../components/NdaPreview';
import { NdaFormData } from '../lib/types';

const baseData: NdaFormData = {
  purpose: 'Evaluating a potential business partnership',
  effectiveDate: '2026-04-22',
  mndaTermType: 'expires',
  mndaTermYears: 2,
  confidentialityTermType: 'years',
  confidentialityTermYears: 3,
  governingLaw: 'California',
  jurisdiction: 'San Francisco, California',
  modifications: '',
  party1: {
    name: 'Alice Smith',
    title: 'CEO',
    company: 'Acme Corp',
    noticeAddress: '123 Main St, San Francisco, CA 94105',
    date: '2026-04-22',
  },
  party2: {
    name: 'Bob Jones',
    title: 'CTO',
    company: 'Beta LLC',
    noticeAddress: '456 Market St, New York, NY 10001',
    date: '2026-04-22',
  },
};

describe('NdaPreview — structure', () => {
  it('renders the document title', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getByText('Mutual Non-Disclosure Agreement')).toBeInTheDocument();
  });

  it('renders Standard Terms heading', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getByText('Standard Terms')).toBeInTheDocument();
  });

  it('renders the Download PDF button', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
  });
});

describe('NdaPreview — page break layout', () => {
  it('has exactly two elements with class page-break (party page + standard terms page)', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const breaks = container.querySelectorAll('.page-break');
    expect(breaks).toHaveLength(2);
  });

  it('first page-break contains the signature table (party information page)', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const [firstBreak] = Array.from(container.querySelectorAll('.page-break'));
    expect(firstBreak.querySelector('table')).not.toBeNull();
  });

  it('second page-break contains the Standard Terms text', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const [, secondBreak] = Array.from(container.querySelectorAll('.page-break'));
    expect(secondBreak.textContent).toContain('Standard Terms');
  });

  it('signature table page comes before Standard Terms page in DOM order', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const [firstBreak, secondBreak] = Array.from(container.querySelectorAll('.page-break'));
    // Node.DOCUMENT_POSITION_FOLLOWING means firstBreak precedes secondBreak
    const position = firstBreak.compareDocumentPosition(secondBreak);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('both page-break divs have pageBreakBefore: always inline style', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const breaks = Array.from(container.querySelectorAll('.page-break')) as HTMLElement[];
    breaks.forEach(el => {
      expect(el.style.pageBreakBefore).toBe('always');
    });
  });
});

describe('NdaPreview — cover page content', () => {
  it('displays the purpose text', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getAllByText(baseData.purpose).length).toBeGreaterThan(0);
  });

  it('displays governing law and jurisdiction', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getAllByText('California').length).toBeGreaterThan(0);
    expect(screen.getAllByText('San Francisco, California').length).toBeGreaterThan(0);
  });

  it('displays party company names in signature table header', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getByText('Party 1 — Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Party 2 — Beta LLC')).toBeInTheDocument();
  });

  it('displays party names in signature rows', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getAllByText('Alice Smith').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bob Jones').length).toBeGreaterThan(0);
  });

  it('formats effective date correctly', () => {
    render(<NdaPreview data={baseData} />);
    // April 22, 2026
    expect(screen.getAllByText('April 22, 2026').length).toBeGreaterThan(0);
  });

  it('shows MNDA term expires checkbox label', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getByText(/Expires 2 year\(s\) from Effective Date/)).toBeInTheDocument();
  });

  it('shows confidentiality term years label', () => {
    render(<NdaPreview data={baseData} />);
    expect(screen.getByText(/3 year\(s\) from Effective Date/)).toBeInTheDocument();
  });
});

describe('NdaPreview — empty / placeholder state', () => {
  const emptyData: NdaFormData = {
    ...baseData,
    purpose: '',
    governingLaw: '',
    jurisdiction: '',
    party1: { name: '', title: '', company: '', noticeAddress: '', date: '' },
    party2: { name: '', title: '', company: '', noticeAddress: '', date: '' },
  };

  it('renders placeholder text for empty purpose', () => {
    render(<NdaPreview data={emptyData} />);
    expect(screen.getAllByText(/\[Purpose\]/).length).toBeGreaterThan(0);
  });

  it('renders placeholder for empty governing law', () => {
    render(<NdaPreview data={emptyData} />);
    expect(screen.getAllByText(/\[State\]/).length).toBeGreaterThan(0);
  });

  it('shows Party 1 / Party 2 headers without company dash when company is empty', () => {
    render(<NdaPreview data={emptyData} />);
    expect(screen.getByText('Party 1')).toBeInTheDocument();
    expect(screen.getByText('Party 2')).toBeInTheDocument();
  });
});

describe('NdaPreview — Standard Terms content', () => {
  it('renders all 11 numbered sections', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const [, standardTermsDiv] = Array.from(container.querySelectorAll('.page-break'));
    for (let i = 1; i <= 11; i++) {
      expect(standardTermsDiv.textContent).toContain(`${i}.`);
    }
  });

  it('section 9 references the governing law', () => {
    const { container } = render(<NdaPreview data={baseData} />);
    const [, standardTermsDiv] = Array.from(container.querySelectorAll('.page-break'));
    expect(standardTermsDiv.textContent).toContain('California');
  });
});
