export interface CatalogEntry {
  name: string;
  description: string;
  filename: string;
  /** Overrides [filename] when multiple template files are needed (e.g. NDA cover page + standard terms). */
  allTemplates?: string[];
}

export interface FieldDef {
  key: string;
  label: string;
  type: 'string' | 'date' | 'number' | 'enum' | 'object';
  options?: string[];
}

/** All supported document types shown in the selector (NDA cover-page entry is omitted). */
export const CATALOG: CatalogEntry[] = [
  {
    name: "Mutual Non-Disclosure Agreement",
    description: "Standard terms for a mutual NDA allowing two parties to share confidential information for the purpose of evaluating a potential business relationship. Covers use restrictions, exceptions, term, and return of confidential information.",
    filename: "templates/Mutual-NDA.md",
    allTemplates: ["templates/Mutual-NDA-coverpage.md", "templates/Mutual-NDA.md"],
  },
  {
    name: "Cloud Service Agreement",
    description: "Comprehensive standard terms for a SaaS/cloud service agreement between a provider and customer. Covers access and use rights, privacy, payment, term, warranties, limitation of liability, indemnification, and confidentiality.",
    filename: "templates/CSA.md",
  },
  {
    name: "Design Partner Agreement",
    description: "Standard terms for an early-access design partner program where a partner receives early product access in exchange for providing structured feedback to help the provider develop and improve the product.",
    filename: "templates/design-partner-agreement.md",
  },
  {
    name: "Service Level Agreement",
    description: "Standard terms for a service level agreement specifying uptime targets, response time commitments, service credit calculations, and remedies including termination rights for sustained underperformance.",
    filename: "templates/sla.md",
  },
  {
    name: "Professional Services Agreement",
    description: "Standard terms for a professional services engagement covering services delivery, deliverable acceptance, intellectual property ownership and assignment, payment, confidentiality, insurance, and indemnification.",
    filename: "templates/psa.md",
  },
  {
    name: "Data Processing Agreement",
    description: "Standard terms for a GDPR and UK GDPR-compliant data processing agreement. Covers processor and subprocessor obligations, restricted international transfers, security incident response, and audit rights.",
    filename: "templates/DPA.md",
  },
  {
    name: "Software License Agreement",
    description: "Standard terms for an on-premise software license agreement. Covers the license grant, usage restrictions, open source software, updates, payment, warranties, limitation of liability, indemnification, and confidentiality.",
    filename: "templates/Software-License-Agreement.md",
  },
  {
    name: "Partnership Agreement",
    description: "Standard terms for a business partnership agreement covering mutual obligations, trademark licensing between partners, payment, escalation procedures, confidentiality, indemnification, and limitation of liability.",
    filename: "templates/Partnership-Agreement.md",
  },
  {
    name: "Pilot Agreement",
    description: "Standard terms for a time-limited pilot or proof-of-concept engagement allowing a customer to evaluate a product before committing to a long-term agreement. Covers access rights, restrictions, disclaimers, and confidentiality.",
    filename: "templates/Pilot-Agreement.md",
  },
  {
    name: "Business Associate Agreement",
    description: "Standard HIPAA-compliant business associate agreement governing the handling of Protected Health Information (PHI) by a service provider. Covers permitted uses, safeguards, subcontractors, breach notification, and term.",
    filename: "templates/BAA.md",
  },
  {
    name: "AI Addendum",
    description: "Standard addendum for agreements involving AI and machine learning services. Covers permitted uses of AI services, restrictions, model training permissions, IP ownership of inputs and outputs, and disclaimers.",
    filename: "templates/AI-Addendum.md",
  },
];

/** Field definitions per document type — used to build the Key Terms panel and template substitution map. */
export const DOCUMENT_FIELDS: Record<string, FieldDef[]> = {
  "Mutual Non-Disclosure Agreement": [
    { key: "purpose", label: "Purpose", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "mndaTermType", label: "MNDA Term Type", type: "enum", options: ["expires", "until_terminated"] },
    { key: "mndaTermYears", label: "MNDA Term Years", type: "number" },
    { key: "confidentialityTermType", label: "Confidentiality Term Type", type: "enum", options: ["years", "perpetuity"] },
    { key: "confidentialityTermYears", label: "Confidentiality Term Years", type: "number" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
    { key: "jurisdiction", label: "Jurisdiction", type: "string" },
    { key: "modifications", label: "Modifications", type: "string" },
    { key: "party1", label: "Party 1", type: "object" },
    { key: "party2", label: "Party 2", type: "object" },
  ],
  "Cloud Service Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "subscriptionPeriod", label: "Subscription Period", type: "string" },
    { key: "paymentProcess", label: "Payment Process", type: "string" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
    { key: "generalCapAmount", label: "General Cap Amount", type: "string" },
  ],
  "Design Partner Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "partnerName", label: "Partner", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "term", label: "Term", type: "string" },
    { key: "fees", label: "Fees", type: "string" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
    { key: "chosenCourts", label: "Chosen Courts", type: "string" },
    { key: "noticeAddress", label: "Notice Address", type: "string" },
  ],
  "Service Level Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "subscriptionPeriod", label: "Subscription Period", type: "string" },
    { key: "targetUptime", label: "Target Uptime", type: "string" },
    { key: "targetResponseTime", label: "Target Response Time", type: "string" },
    { key: "supportChannel", label: "Support Channel", type: "string" },
    { key: "uptimeCredit", label: "Uptime Credit", type: "string" },
    { key: "responseTimeCredit", label: "Response Time Credit", type: "string" },
  ],
  "Professional Services Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
    { key: "customerPolicies", label: "Customer Policies", type: "string" },
    { key: "securityPolicy", label: "Security Policy", type: "string" },
  ],
  "Data Processing Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "categoriesOfPersonalData", label: "Categories of Personal Data", type: "string" },
    { key: "categoriesOfDataSubjects", label: "Categories of Data Subjects", type: "string" },
    { key: "breachNotificationPeriod", label: "Breach Notification Period", type: "string" },
  ],
  "Software License Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "permittedUses", label: "Permitted Uses", type: "string" },
    { key: "subscriptionPeriod", label: "Subscription Period", type: "string" },
    { key: "paymentProcess", label: "Payment Process", type: "string" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
  ],
  "Partnership Agreement": [
    { key: "companyName", label: "Company", type: "string" },
    { key: "partnerName", label: "Partner", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "obligations", label: "Obligations", type: "string" },
    { key: "territory", label: "Territory", type: "string" },
    { key: "endDate", label: "End Date", type: "date" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
    { key: "generalCapAmount", label: "General Cap Amount", type: "string" },
  ],
  "Pilot Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "pilotPeriod", label: "Pilot Period", type: "string" },
    { key: "evaluationPurposes", label: "Evaluation Purposes", type: "string" },
    { key: "governingLaw", label: "Governing Law", type: "string" },
  ],
  "Business Associate Agreement": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "companyName", label: "Company", type: "string" },
    { key: "baaEffectiveDate", label: "BAA Effective Date", type: "date" },
    { key: "breachNotificationPeriod", label: "Breach Notification Period", type: "string" },
    { key: "limitations", label: "Limitations", type: "string" },
  ],
  "AI Addendum": [
    { key: "providerName", label: "Provider", type: "string" },
    { key: "customerName", label: "Customer", type: "string" },
    { key: "trainingData", label: "Training Data", type: "string" },
    { key: "trainingPurposes", label: "Training Purposes", type: "string" },
    { key: "trainingRestrictions", label: "Training Restrictions", type: "string" },
    { key: "improvementRestrictions", label: "Improvement Restrictions", type: "string" },
  ],
};
