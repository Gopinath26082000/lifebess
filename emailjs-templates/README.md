# Life Bess EmailJS Dashboard Templates

The frontend is already wired through `src/utils/leads.js`. These files are the dashboard-ready templates to paste into EmailJS.

## Contact Template

- Template Name: `Life Bess - Contact Inquiry`
- Template ID placeholder: `YOUR_CONTACT_TEMPLATE_ID`
- To Email: `{{owner_email}}`
- From Name: `Life Bess Website`
- Reply To: `{{reply_to}}`
- Subject: `New Contact Inquiry - {{from_name}} | Life Bess`
- HTML Body: paste `emailjs-templates/contact-inquiry-template.html`

## Quote Template

- Template Name: `Life Bess - Solar Quote Request`
- Template ID placeholder: `YOUR_QUOTE_TEMPLATE_ID`
- To Email: `{{owner_email}}`
- From Name: `Life Bess Website`
- Reply To: `{{reply_to}}`
- Subject: `New Solar Quote Request - {{from_name}} | Life Bess`
- HTML Body: paste `emailjs-templates/solar-quote-request-template.html`

## Required .env.local

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_xxxxxxx
VITE_EMAILJS_QUOTE_TEMPLATE_ID=template_quote_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_xxxxxxx
VITE_OWNER_EMAIL=info@lifebess.com
```

## Variables Used

Both templates are compatible with all variables sent by the frontend:

```txt
to_email
owner_email
form_type
reference
submitted_at
submittedAt
page_url
user_source
user_agent
logo_url
from_name
from_email
reply_to
phone
location
subject
message
preferred_contact
residential_commercial
property_type
service_type
roof_type
connection_type
solar_capacity
required_capacity
budget_range
monthly_eb_bill
rooftop_area
installation_timeline
selected_plan
additional_information
accepted_terms
estimated_annual_savings
estimated_project_cost
estimated_payback
eligible_subsidy
all_fields
all_fields_html
all_fields_json
email_body_html
email_body
```

## Notes

- EmailJS will generate the real Template IDs after each template is created.
- Paste those generated IDs into `.env.local`.
- The templates use `{{logo_url}}` for the Life Bess logo and include alt text fallback.
- The backup section uses `{{{all_fields_html}}}` so EmailJS can render the full HTML table without escaping it. If your EmailJS editor escapes triple braces, replace it with `{{all_fields}}`.
