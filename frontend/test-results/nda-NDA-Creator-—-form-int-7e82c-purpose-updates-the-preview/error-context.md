# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nda.spec.ts >> NDA Creator — form interaction >> typing purpose updates the preview
- Location: __tests__\e2e\nda.spec.ts:36:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#nda-doc').getByText('Strategic acquisition evaluation').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#nda-doc').getByText('Strategic acquisition evaluation').first()

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: Prelegal
      - heading "Mutual NDA Creator" [level=1] [ref=e7]
      - paragraph [ref=e8]: Fill in the details to generate your agreement
    - paragraph [ref=e9]: Agreement Details
    - generic [ref=e10]:
      - text: Purpose
      - textbox "How Confidential Information may be used" [active] [ref=e11]: Strategic acquisition evaluation
    - generic [ref=e12]:
      - text: Effective Date
      - textbox [ref=e13]: 2026-04-24
    - paragraph [ref=e14]: Duration
    - generic [ref=e15]:
      - text: MNDA Term
      - generic [ref=e16]:
        - generic [ref=e17]:
          - radio "Expires after 1 year(s)" [checked] [ref=e18]
          - text: Expires after
          - spinbutton [ref=e19]: "1"
          - text: year(s)
        - generic [ref=e20]:
          - radio "Until terminated" [ref=e21]
          - text: Until terminated
    - generic [ref=e22]:
      - text: Term of Confidentiality
      - generic [ref=e23]:
        - generic [ref=e24]:
          - radio "1 year(s) from Effective Date" [checked] [ref=e25]
          - spinbutton [ref=e26]: "1"
          - text: year(s) from Effective Date
        - generic [ref=e27]:
          - radio "In perpetuity" [ref=e28]
          - text: In perpetuity
    - paragraph [ref=e29]: Governing Law
    - generic [ref=e30]:
      - text: State
      - textbox "e.g. Delaware" [ref=e31]
    - generic [ref=e32]:
      - text: Jurisdiction
      - textbox "e.g. courts located in New Castle, DE" [ref=e33]
    - paragraph [ref=e34]: Modifications
    - generic [ref=e35]:
      - text: MNDA Modifications
      - textbox "List any modifications, or leave blank for none" [ref=e36]
    - generic [ref=e37]:
      - paragraph [ref=e38]: Party 1
      - generic [ref=e39]:
        - text: Print Name
        - textbox "Print Name" [ref=e40]
      - generic [ref=e41]:
        - text: Title
        - textbox "Title" [ref=e42]
      - generic [ref=e43]:
        - text: Company
        - textbox "Company" [ref=e44]
      - generic [ref=e45]:
        - text: Notice Address
        - textbox "Email or postal address" [ref=e46]
      - generic [ref=e47]:
        - text: Date
        - textbox [ref=e48]:
          - /placeholder: Date
    - generic [ref=e49]:
      - paragraph [ref=e50]: Party 2
      - generic [ref=e51]:
        - text: Print Name
        - textbox "Print Name" [ref=e52]
      - generic [ref=e53]:
        - text: Title
        - textbox "Title" [ref=e54]
      - generic [ref=e55]:
        - text: Company
        - textbox "Company" [ref=e56]
      - generic [ref=e57]:
        - text: Notice Address
        - textbox "Email or postal address" [ref=e58]
      - generic [ref=e59]:
        - text: Date
        - textbox [ref=e60]:
          - /placeholder: Date
  - generic [ref=e62]:
    - generic [ref=e63]:
      - heading "Preview" [level=2] [ref=e64]
      - button "Download PDF" [ref=e65]:
        - img [ref=e66]
        - text: Download PDF
    - generic [ref=e69]:
      - heading "Mutual Non-Disclosure Agreement" [level=1] [ref=e70]
      - generic [ref=e71]:
        - heading "Using This Mutual Non-Disclosure Agreement" [level=2] [ref=e72]
        - paragraph [ref=e73]: "This Mutual Non-Disclosure Agreement (the \"MNDA\") consists of: (1) this Cover Page (\"Cover Page\") and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 (\"Standard Terms\") identical to those posted at commonpaper.com/standards/mutual-nda/1.0. Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms."
      - generic [ref=e74]:
        - heading "Purpose" [level=3] [ref=e75]
        - paragraph [ref=e76]: How Confidential Information may be used
        - paragraph [ref=e77]: Evaluating whether to enter into a business relationship with the other party.
      - generic [ref=e78]:
        - heading "Effective Date" [level=3] [ref=e79]
        - paragraph [ref=e80]: April 24, 2026
      - generic [ref=e81]:
        - heading "MNDA Term" [level=3] [ref=e82]
        - paragraph [ref=e83]: The length of this MNDA
        - generic [ref=e84]:
          - generic [ref=e85]: ☑
          - generic [ref=e86]: Expires 1 year(s) from Effective Date.
        - generic [ref=e87]:
          - generic [ref=e88]: ☐
          - generic [ref=e89]: Continues until terminated in accordance with the terms of the MNDA.
      - generic [ref=e90]:
        - heading "Term of Confidentiality" [level=3] [ref=e91]
        - paragraph [ref=e92]: How long Confidential Information is protected
        - generic [ref=e93]:
          - generic [ref=e94]: ☑
          - generic [ref=e95]: 1 year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.
        - generic [ref=e96]:
          - generic [ref=e97]: ☐
          - generic [ref=e98]: In perpetuity.
      - generic [ref=e99]:
        - heading "Governing Law & Jurisdiction" [level=3] [ref=e100]
        - paragraph [ref=e101]:
          - text: "Governing Law:"
          - generic [ref=e102]: "[State]"
        - paragraph [ref=e103]:
          - text: "Jurisdiction:"
          - generic [ref=e104]: "[City or county and state]"
      - generic [ref=e105]:
        - heading "MNDA Modifications" [level=3] [ref=e106]
        - paragraph [ref=e107]: None.
      - generic [ref=e108]:
        - paragraph [ref=e109]: By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.
        - table [ref=e110]:
          - rowgroup [ref=e111]:
            - row "Party 1 Party 2" [ref=e112]:
              - columnheader [ref=e113]
              - columnheader "Party 1" [ref=e114]
              - columnheader "Party 2" [ref=e115]
          - rowgroup [ref=e116]:
            - row "Signature" [ref=e117]:
              - cell "Signature" [ref=e118]
              - cell [ref=e119]
              - cell [ref=e120]
            - row "Print Name [Print Name] [Print Name]" [ref=e121]:
              - cell "Print Name" [ref=e122]
              - cell "[Print Name]" [ref=e123]:
                - generic [ref=e124]: "[Print Name]"
              - cell "[Print Name]" [ref=e125]:
                - generic [ref=e126]: "[Print Name]"
            - row "Title [Title] [Title]" [ref=e127]:
              - cell "Title" [ref=e128]
              - cell "[Title]" [ref=e129]:
                - generic [ref=e130]: "[Title]"
              - cell "[Title]" [ref=e131]:
                - generic [ref=e132]: "[Title]"
            - row "Company [Company] [Company]" [ref=e133]:
              - cell "Company" [ref=e134]
              - cell "[Company]" [ref=e135]:
                - generic [ref=e136]: "[Company]"
              - cell "[Company]" [ref=e137]:
                - generic [ref=e138]: "[Company]"
            - row "Notice Address [Notice Address] [Notice Address]" [ref=e139]:
              - cell "Notice Address" [ref=e140]
              - cell "[Notice Address]" [ref=e141]:
                - generic [ref=e142]: "[Notice Address]"
              - cell "[Notice Address]" [ref=e143]:
                - generic [ref=e144]: "[Notice Address]"
            - row "Date [Date] [Date]" [ref=e145]:
              - cell "Date" [ref=e146]
              - cell "[Date]" [ref=e147]:
                - generic [ref=e148]: "[Date]"
              - cell "[Date]" [ref=e149]:
                - generic [ref=e150]: "[Date]"
      - paragraph [ref=e152]: Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under CC BY 4.0.
      - generic [ref=e153]:
        - heading "Standard Terms" [level=1] [ref=e154]
        - generic [ref=e155]:
          - generic [ref=e156]: 1. Introduction.
          - text: This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) ("
          - strong [ref=e157]: MNDA
          - text: "\") allows each party (\""
          - strong [ref=e158]: Disclosing Party
          - text: "\") to disclose or make available information in connection with the Evaluating whether to enter into a business relationship with the other party. which (1) the Disclosing Party identifies to the receiving party (\""
          - strong [ref=e159]: Receiving Party
          - text: "\") as \"confidential\", \"proprietary\", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure (\""
          - strong [ref=e160]: Confidential Information
          - text: "\"). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms (\""
          - strong [ref=e161]: Cover Page
          - text: "\"). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page."
        - generic [ref=e162]:
          - generic [ref=e163]: 2. Use and Protection of Confidential Information.
          - text: "The Receiving Party shall: (a) use Confidential Information solely for the Evaluating whether to enter into a business relationship with the other party.; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Evaluating whether to enter into a business relationship with the other party., provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care."
        - generic [ref=e164]:
          - generic [ref=e165]: 3. Exceptions.
          - text: "The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information."
        - generic [ref=e166]:
          - generic [ref=e167]: 4. Disclosures Required by Law.
          - text: The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.
        - generic [ref=e168]:
          - generic [ref=e169]: 5. Term and Termination.
          - text: This MNDA commences on the April 24, 2026 and expires at the end of the 1 year(s) from the Effective Date. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for 1 year(s) from the Effective Date, despite any expiration or termination of this MNDA.
        - generic [ref=e170]:
          - generic [ref=e171]: 6. Return or Destruction of Confidential Information.
          - text: "Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information."
        - generic [ref=e172]:
          - generic [ref=e173]: 7. Proprietary Rights.
          - text: The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.
        - generic [ref=e174]:
          - generic [ref=e175]: 8. Disclaimer.
          - text: ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        - generic [ref=e176]:
          - generic [ref=e177]: 9. Governing Law and Jurisdiction.
          - text: This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of
          - generic [ref=e178]: "[Governing Law]"
          - text: ", without regard to the conflict of laws provisions of such"
          - generic [ref=e179]: "[Governing Law]"
          - text: . Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in
          - generic [ref=e180]: "[Jurisdiction]"
          - text: . Each party irrevocably submits to the exclusive jurisdiction of such
          - generic [ref=e181]: "[Jurisdiction]"
          - text: in any such suit, action, or proceeding.
        - generic [ref=e182]:
          - generic [ref=e183]: 10. Equitable Relief.
          - text: A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.
        - generic [ref=e184]:
          - generic [ref=e185]: 11. General.
          - text: Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.
        - paragraph [ref=e187]: Common Paper Mutual Non-Disclosure Agreement Version 1.0 free to use under CC BY 4.0.
```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | import path from 'path';
  3   | import fs from 'fs';
  4   | 
  5   | const fillForm = async (page: Page) => {
  6   |   await page.getByPlaceholder('How Confidential Information may be used').fill('Evaluating a potential acquisition');
  7   |   await page.locator('input[type="date"]').first().fill('2026-04-22');
  8   |   // Governing law field is labeled "State" with placeholder "e.g. Delaware"
  9   |   await page.getByLabel('State').fill('California');
  10  |   await page.getByLabel('Jurisdiction').fill('San Francisco, California');
  11  |   // Party 1
  12  |   await page.locator('input[placeholder="Print Name"]').first().fill('Alice Smith');
  13  |   await page.locator('input[placeholder="Title"]').first().fill('CEO');
  14  |   await page.locator('input[placeholder="Company"]').first().fill('Acme Corp');
  15  |   // Party 2
  16  |   await page.locator('input[placeholder="Print Name"]').nth(1).fill('Bob Jones');
  17  |   await page.locator('input[placeholder="Title"]').nth(1).fill('CTO');
  18  |   await page.locator('input[placeholder="Company"]').nth(1).fill('Beta LLC');
  19  | };
  20  | 
  21  | test.describe('NDA Creator — page load', () => {
  22  |   test('loads successfully and shows key headings', async ({ page }) => {
  23  |     await page.goto('/');
  24  |     await expect(page.getByRole('heading', { name: 'Mutual NDA Creator' })).toBeVisible();
  25  |     await expect(page.getByText('Mutual Non-Disclosure Agreement').first()).toBeVisible();
  26  |     await expect(page.getByRole('heading', { name: 'Standard Terms' })).toBeVisible();
  27  |   });
  28  | 
  29  |   test('Download PDF button is visible', async ({ page }) => {
  30  |     await page.goto('/');
  31  |     await expect(page.getByRole('button', { name: /download pdf/i })).toBeVisible();
  32  |   });
  33  | });
  34  | 
  35  | test.describe('NDA Creator — form interaction', () => {
  36  |   test('typing purpose updates the preview', async ({ page }) => {
  37  |     await page.goto('/');
  38  |     await page.getByPlaceholder('How Confidential Information may be used').fill('Strategic acquisition evaluation');
> 39  |     await expect(page.locator('#nda-doc').getByText('Strategic acquisition evaluation').first()).toBeVisible();
      |                                                                                                  ^ Error: expect(locator).toBeVisible() failed
  40  |   });
  41  | 
  42  |   test('typing governing law updates the preview', async ({ page }) => {
  43  |     await page.goto('/');
  44  |     // Field label is "State", placeholder is "e.g. Delaware"
  45  |     await page.getByLabel('State').fill('Delaware');
  46  |     await expect(page.locator('#nda-doc').getByText('Delaware').first()).toBeVisible();
  47  |   });
  48  | 
  49  |   test('party company names appear in signature table headers', async ({ page }) => {
  50  |     await page.goto('/');
  51  |     await page.locator('input[placeholder="Company"]').first().fill('Acme Corp');
  52  |     await page.locator('input[placeholder="Company"]').nth(1).fill('Beta LLC');
  53  |     await expect(page.locator('#nda-doc').getByText('Party 1 — Acme Corp')).toBeVisible();
  54  |     await expect(page.locator('#nda-doc').getByText('Party 2 — Beta LLC')).toBeVisible();
  55  |   });
  56  | 
  57  |   test('switching MNDA term to "until terminated" checks the second radio', async ({ page }) => {
  58  |     await page.goto('/');
  59  |     // Label text in the form is "Until terminated"
  60  |     await page.getByText('Until terminated').click();
  61  |     const doc = page.locator('#nda-doc');
  62  |     // The "until_terminated" check row should now show ☑
  63  |     await expect(doc.getByText(/Continues until terminated/)).toBeVisible();
  64  |   });
  65  | });
  66  | 
  67  | test.describe('NDA Creator — PDF page-break structure in DOM', () => {
  68  |   test('document has exactly two .page-break elements', async ({ page }) => {
  69  |     await page.goto('/');
  70  |     await expect(page.locator('#nda-doc .page-break')).toHaveCount(2);
  71  |   });
  72  | 
  73  |   test('first .page-break wraps the signature table', async ({ page }) => {
  74  |     await page.goto('/');
  75  |     const firstBreak = page.locator('#nda-doc .page-break').first();
  76  |     await expect(firstBreak.locator('table')).toBeVisible();
  77  |   });
  78  | 
  79  |   test('second .page-break contains Standard Terms heading', async ({ page }) => {
  80  |     await page.goto('/');
  81  |     const secondBreak = page.locator('#nda-doc .page-break').nth(1);
  82  |     await expect(secondBreak.getByRole('heading', { name: 'Standard Terms' })).toBeVisible();
  83  |   });
  84  | 
  85  |   test('both .page-break elements have pageBreakBefore: always inline style', async ({ page }) => {
  86  |     await page.goto('/');
  87  |     const breaks = page.locator('#nda-doc .page-break');
  88  |     const count = await breaks.count();
  89  |     for (let i = 0; i < count; i++) {
  90  |       const style = await breaks.nth(i).getAttribute('style');
  91  |       // Next.js minifies inline styles: no space after colon
  92  |       expect(style).toMatch(/page-break-before:\s*always/);
  93  |     }
  94  |   });
  95  | 
  96  |   test('signature table page comes before Standard Terms page in DOM order', async ({ page }) => {
  97  |     await page.goto('/');
  98  |     // Use DOM compareDocumentPosition to verify order without relying on text indices
  99  |     const isFirstBeforeSecond = await page.evaluate(() => {
  100 |       const breaks = document.querySelectorAll('#nda-doc .page-break');
  101 |       if (breaks.length < 2) return false;
  102 |       const pos = breaks[0].compareDocumentPosition(breaks[1]);
  103 |       return !!(pos & Node.DOCUMENT_POSITION_FOLLOWING);
  104 |     });
  105 |     expect(isFirstBeforeSecond).toBe(true);
  106 |   });
  107 | });
  108 | 
  109 | test.describe('NDA Creator — PDF download', () => {
  110 |   test('clicking Download PDF triggers a file download named mutual-nda.pdf', async ({ page }) => {
  111 |     await page.goto('/');
  112 |     await fillForm(page);
  113 | 
  114 |     const [download] = await Promise.all([
  115 |       page.waitForEvent('download', { timeout: 30000 }),
  116 |       page.getByRole('button', { name: /download pdf/i }).click(),
  117 |     ]);
  118 | 
  119 |     expect(download.suggestedFilename()).toBe('mutual-nda.pdf');
  120 | 
  121 |     const downloadPath = path.join(process.cwd(), '__tests__', 'e2e', 'downloads', 'mutual-nda.pdf');
  122 |     fs.mkdirSync(path.dirname(downloadPath), { recursive: true });
  123 |     await download.saveAs(downloadPath);
  124 | 
  125 |     const stat = fs.statSync(downloadPath);
  126 |     expect(stat.size).toBeGreaterThan(10000);
  127 |   });
  128 | });
  129 | 
```