from typing import Any

REGISTRY: dict[str, dict[str, Any]] = {
    "Mutual Non-Disclosure Agreement": {
        "templates": ["templates/Mutual-NDA-coverpage.md", "templates/Mutual-NDA.md"],
        "fields": [
            {"key": "purpose", "label": "Purpose", "type": "string", "desc": "How Confidential Information may be used (e.g. 'Evaluating a potential partnership')"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "mndaTermType", "label": "MNDA Term Type", "type": "enum", "desc": "Whether the MNDA expires after a fixed term or continues until terminated", "options": ["expires", "until_terminated"]},
            {"key": "mndaTermYears", "label": "MNDA Term Years", "type": "number", "desc": "Number of years for the MNDA term (only when mndaTermType is 'expires')"},
            {"key": "confidentialityTermType", "label": "Confidentiality Term Type", "type": "enum", "desc": "Whether confidentiality lasts a fixed number of years or in perpetuity", "options": ["years", "perpetuity"]},
            {"key": "confidentialityTermYears", "label": "Confidentiality Term Years", "type": "number", "desc": "Number of years for confidentiality (only when confidentialityTermType is 'years')"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state, e.g. 'Delaware'"},
            {"key": "jurisdiction", "label": "Jurisdiction", "type": "string", "desc": "Courts for disputes, e.g. 'courts in New Castle, DE'"},
            {"key": "modifications", "label": "Modifications", "type": "string", "desc": "Any modifications to standard terms; empty string if none"},
            {"key": "party1", "label": "Party 1", "type": "object", "desc": "First party (provide as object with name, title, company, noticeAddress, date)"},
            {"key": "party2", "label": "Party 2", "type": "object", "desc": "Second party (provide as object with name, title, company, noticeAddress, date)"},
        ],
    },
    "Cloud Service Agreement": {
        "templates": ["templates/CSA.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the service provider company"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the customer company"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "subscriptionPeriod", "label": "Subscription Period", "type": "string", "desc": "Duration of the subscription, e.g. '12 months'"},
            {"key": "paymentProcess", "label": "Payment Process", "type": "string", "desc": "Payment method and timing, e.g. 'net-30 invoicing'"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state for the agreement"},
            {"key": "generalCapAmount", "label": "General Cap Amount", "type": "string", "desc": "Maximum liability cap, e.g. 'fees paid in the prior 12 months'"},
        ],
    },
    "Design Partner Agreement": {
        "templates": ["templates/design-partner-agreement.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the provider offering early product access"},
            {"key": "partnerName", "label": "Partner", "type": "string", "desc": "Name of the design partner company"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "term", "label": "Term", "type": "string", "desc": "Duration of the design partner program, e.g. '6 months'"},
            {"key": "fees", "label": "Fees", "type": "string", "desc": "Fees paid by Partner, if any (e.g. '$0' or '$500/month')"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state for the agreement"},
            {"key": "chosenCourts", "label": "Chosen Courts", "type": "string", "desc": "Courts for dispute resolution, e.g. 'courts in San Francisco, CA'"},
            {"key": "noticeAddress", "label": "Notice Address", "type": "string", "desc": "Email or postal address for legal notices"},
        ],
    },
    "Service Level Agreement": {
        "templates": ["templates/sla.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the cloud service provider"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the customer company"},
            {"key": "subscriptionPeriod", "label": "Subscription Period", "type": "string", "desc": "Period covered, e.g. '12 months starting January 1, 2025'"},
            {"key": "targetUptime", "label": "Target Uptime", "type": "string", "desc": "Uptime commitment, e.g. '99.9%'"},
            {"key": "targetResponseTime", "label": "Target Response Time", "type": "string", "desc": "Max support response time, e.g. '4 business hours'"},
            {"key": "supportChannel", "label": "Support Channel", "type": "string", "desc": "How to submit support requests, e.g. 'support@provider.com'"},
            {"key": "uptimeCredit", "label": "Uptime Credit", "type": "string", "desc": "Service credit for uptime failures, e.g. '10% of monthly fee'"},
            {"key": "responseTimeCredit", "label": "Response Time Credit", "type": "string", "desc": "Service credit for response time failures, e.g. '5% of monthly fee'"},
        ],
    },
    "Professional Services Agreement": {
        "templates": ["templates/psa.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the professional services provider"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the customer company"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state for the agreement"},
            {"key": "customerPolicies", "label": "Customer Policies", "type": "string", "desc": "Any customer policies Provider must follow, or 'None'"},
            {"key": "securityPolicy", "label": "Security Policy", "type": "string", "desc": "Provider's security policy reference, or 'None'"},
        ],
    },
    "Data Processing Agreement": {
        "templates": ["templates/DPA.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the data processor (service provider)"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the data controller (customer)"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "categoriesOfPersonalData", "label": "Categories of Personal Data", "type": "string", "desc": "Types of personal data being processed, e.g. 'names, email addresses, usage logs'"},
            {"key": "categoriesOfDataSubjects", "label": "Categories of Data Subjects", "type": "string", "desc": "Who the data subjects are, e.g. 'Customer employees and end users'"},
            {"key": "breachNotificationPeriod", "label": "Breach Notification Period", "type": "string", "desc": "Time to report data breaches, e.g. '72 hours'"},
        ],
    },
    "Software License Agreement": {
        "templates": ["templates/Software-License-Agreement.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the software licensor"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the licensee company"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "permittedUses", "label": "Permitted Uses", "type": "string", "desc": "Allowed uses of the software, e.g. 'internal business operations only'"},
            {"key": "subscriptionPeriod", "label": "Subscription Period", "type": "string", "desc": "License duration, e.g. '1 year'"},
            {"key": "paymentProcess", "label": "Payment Process", "type": "string", "desc": "Payment terms, e.g. 'annual upfront payment'"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state for the agreement"},
        ],
    },
    "Partnership Agreement": {
        "templates": ["templates/Partnership-Agreement.md"],
        "fields": [
            {"key": "companyName", "label": "Company", "type": "string", "desc": "Name of the first partner company (the trademark licensor)"},
            {"key": "partnerName", "label": "Partner", "type": "string", "desc": "Name of the second partner company (the licensee)"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "obligations", "label": "Obligations", "type": "string", "desc": "Description of each party's obligations under the partnership"},
            {"key": "territory", "label": "Territory", "type": "string", "desc": "Geographic territory for the trademark license, e.g. 'United States'"},
            {"key": "endDate", "label": "End Date", "type": "date", "desc": "Agreement end date (YYYY-MM-DD)"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state for the agreement"},
            {"key": "generalCapAmount", "label": "General Cap Amount", "type": "string", "desc": "Maximum liability cap, e.g. 'fees paid in the prior 12 months'"},
        ],
    },
    "Pilot Agreement": {
        "templates": ["templates/Pilot-Agreement.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the company providing the pilot product"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the company evaluating the product"},
            {"key": "effectiveDate", "label": "Effective Date", "type": "date", "desc": "Agreement start date (YYYY-MM-DD)"},
            {"key": "pilotPeriod", "label": "Pilot Period", "type": "string", "desc": "Duration of the pilot, e.g. '90 days from the Effective Date'"},
            {"key": "evaluationPurposes", "label": "Evaluation Purposes", "type": "string", "desc": "What Customer is evaluating the product for"},
            {"key": "governingLaw", "label": "Governing Law", "type": "string", "desc": "Governing state for the agreement"},
        ],
    },
    "Business Associate Agreement": {
        "templates": ["templates/BAA.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the business associate (service provider handling PHI)"},
            {"key": "companyName", "label": "Company", "type": "string", "desc": "Name of the covered entity (healthcare organization)"},
            {"key": "baaEffectiveDate", "label": "BAA Effective Date", "type": "date", "desc": "BAA start date (YYYY-MM-DD)"},
            {"key": "breachNotificationPeriod", "label": "Breach Notification Period", "type": "string", "desc": "How quickly to notify of data breaches, e.g. '60 calendar days'"},
            {"key": "limitations", "label": "Limitations", "type": "string", "desc": "Restrictions on offshore PHI processing or de-identification, or 'None'"},
        ],
    },
    "AI Addendum": {
        "templates": ["templates/AI-Addendum.md"],
        "fields": [
            {"key": "providerName", "label": "Provider", "type": "string", "desc": "Name of the AI service provider"},
            {"key": "customerName", "label": "Customer", "type": "string", "desc": "Name of the customer using AI services"},
            {"key": "trainingData", "label": "Training Data", "type": "string", "desc": "Whether Customer data may be used for model training — describe what data, or 'None' if not permitted"},
            {"key": "trainingPurposes", "label": "Training Purposes", "type": "string", "desc": "Authorized purposes for using Customer data in AI training (if any)"},
            {"key": "trainingRestrictions", "label": "Training Restrictions", "type": "string", "desc": "Restrictions on how Customer data may be used in model training (if any)"},
            {"key": "improvementRestrictions", "label": "Improvement Restrictions", "type": "string", "desc": "Restrictions on using Input/Output for non-training product improvement (if any)"},
        ],
    },
}


def build_system_prompt(doc_name: str) -> str:
    entry = REGISTRY.get(doc_name)
    supported = list(REGISTRY.keys())
    supported_list = "\n".join(f"  - {n}" for n in supported)

    if not entry:
        return (
            f"You are a legal document assistant. The document type '{doc_name}' is not supported.\n"
            f"Tell the user and suggest one of these supported types:\n{supported_list}\n\n"
            "IMPORTANT: Respond ONLY with valid JSON:\n"
            '{"message": "your response", "fields": {}}'
        )

    fields = entry["fields"]
    field_lines = []
    for f in fields:
        line = f"- {f['key']}: {f['desc']}"
        if f.get("options"):
            line += f" (one of: {', '.join(f['options'])})"
        field_lines.append(line)

    json_fields = ",\n".join(f'    "{f["key"]}": null' for f in fields)

    object_fields = [f["key"] for f in fields if f["type"] == "object"]
    party_note = ""
    if object_fields:
        example_key = object_fields[0]
        party_note = (
            f"\nFor {'/'.join(object_fields)}, provide an object with only the keys being updated, e.g.: "
            f'"{example_key}": {{"name": "Alice", "company": "Acme"}}'
        )

    return f"""You are a legal document assistant helping draft a {doc_name}.

Collect these fields through friendly, conversational questions (1-2 questions at a time):

{chr(10).join(field_lines)}

Rules:
- Greet the user warmly and ask about the most important fields first
- Ask 1-2 questions at a time in a natural, helpful tone
- When the user provides values, confirm and move to the next unfilled fields
- Focus on fields not yet filled in the current document state
- When all fields are collected, congratulate the user and confirm the document is complete
- If the user asks about a document type other than {doc_name}, explain you currently only handle {doc_name} in this session.
  Mention that the platform also supports:
{supported_list}

IMPORTANT: Respond ONLY with valid JSON — no markdown, no code fences — in exactly this format:
{{
  "message": "your conversational response",
  "fields": {{
{json_fields}
  }}
}}

Set field values when the user provides them. Use null for fields not being updated this turn.{party_note}
"""
