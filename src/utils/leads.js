import {
  EMAILJS_API_URL,
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_QUOTE_TEMPLATE_ID,
  EMAILJS_SERVICE_ID,
  OWNER_EMAIL
} from "../config";
import { logo } from "../assets";
import { formatMoney } from "./calculations";

const REQUIRED_EMAILJS_VALUES = [
  ["service_id", EMAILJS_SERVICE_ID],
  ["public_key", EMAILJS_PUBLIC_KEY],
  ["contact_template_id", EMAILJS_CONTACT_TEMPLATE_ID],
  ["quote_template_id", EMAILJS_QUOTE_TEMPLATE_ID]
];

const FIELD_LABELS = {
  accepted: "Accepted Terms",
  additionalInfo: "Additional Information",
  area: "Available Rooftop Area",
  audience: "Residential / Commercial Selection",
  bill: "Monthly EB Bill",
  budgetRange: "Budget Range",
  city: "City / Location",
  connection: "Connection Type",
  email: "Email Address",
  fullName: "Full Name",
  installationTimeline: "Installation Timeline",
  location: "Location / City",
  message: "Message / Additional Requirements",
  name: "Full Name",
  organization: "Organization",
  phone: "Phone Number",
  pincode: "Pincode / ZIP",
  preferredContact: "Preferred Contact Method",
  project: "Service Type / Project Type",
  rooftop: "Roof Type",
  sector: "Property Type",
  serviceType: "Service Type",
  subject: "Subject",
  "estimate.annualSavings": "Estimated Annual Savings",
  "estimate.emi": "Projected Monthly EMI",
  "estimate.payback": "Estimated Payback",
  "estimate.projectCost": "Estimated Project Cost",
  "estimate.subsidy": "Eligible Subsidy",
  "estimate.systemKw": "Recommended Solar Capacity"
};

function makeReference(prefix = "LB") {
  const year = new Date().getFullYear();
  const value = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${value}`;
}

function formatValue(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === null || value === undefined || value === "") return "Not provided";
  if (Array.isArray(value)) return value.length ? value.map(formatValue).join(", ") : "Not provided";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function flattenLeadData(source, prefix = "") {
  return Object.entries(source || {}).reduce((result, [key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      return { ...result, ...flattenLeadData(value, nextKey) };
    }
    return { ...result, [nextKey]: formatValue(value) };
  }, {});
}

function titleCaseKey(key) {
  return key
    .replace(/^estimate\./, "Estimate ")
    .replace(/([A-Z])/g, " $1")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function labelFor(key) {
  return FIELD_LABELS[key] || titleCaseKey(key);
}

function escapeHtml(value) {
  return formatValue(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPageMeta() {
  if (typeof window === "undefined") {
    return { page_url: "Not available", user_source: "Not available", user_agent: "Not available", logo_url: "" };
  }

  return {
    page_url: window.location.href,
    user_source: document.referrer || "Direct / not available",
    user_agent: window.navigator?.userAgent || "Not available",
    logo_url: new URL(logo, window.location.origin).href
  };
}

function assertEmailJsConfig() {
  const missing = REQUIRED_EMAILJS_VALUES.filter(([, value]) => !value || value.startsWith("YOUR_")).map(([key]) => key);
  if (missing.length) {
    throw new Error(`EmailJS is not configured yet. Add ${missing.join(", ")} in your Vite environment variables.`);
  }
}

function buildAllFieldsBlock(fields) {
  return Object.entries(fields)
    .map(([key, value]) => `${labelFor(key)}: ${formatValue(value)}`)
    .join("\n");
}

function buildAllFieldsHtml(fields) {
  const rows = Object.entries(fields)
    .map(([key, value]) => `<tr><td style="padding:10px 12px;border-bottom:1px solid #e6e9ee;color:#5f6876;font-weight:700;">${escapeHtml(labelFor(key))}</td><td style="padding:10px 12px;border-bottom:1px solid #e6e9ee;color:#101f33;font-weight:800;">${escapeHtml(value)}</td></tr>`)
    .join("");

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #e6e9ee;border-radius:10px;overflow:hidden;">${rows}</table>`;
}

function buildPremiumEmailHtml({ heading, summary, params, allFieldsHtml }) {
  const phoneLink = params.phone && params.phone !== "Not provided" ? `tel:${params.phone.replace(/\s+/g, "")}` : "";
  const mailLink = params.from_email && params.from_email !== "Not provided" ? `mailto:${params.from_email}` : "";

  return `
    <div style="margin:0;padding:28px;background:#f4f6f8;font-family:Manrope,Arial,sans-serif;color:#101f33;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 18px 45px rgba(0,53,90,0.14);">
        <div style="padding:26px 30px;background:#00355a;color:#ffffff;border-bottom:4px solid #ffd51e;">
          ${params.logo_url ? `<img src="${escapeHtml(params.logo_url)}" alt="Life Bess" style="height:48px;width:auto;margin-bottom:18px;" />` : ""}
          <div style="font-size:12px;font-weight:900;text-transform:uppercase;color:#ffd51e;letter-spacing:.06em;">${escapeHtml(params.form_type)}</div>
          <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:30px;line-height:1.12;color:#ffffff;">${escapeHtml(heading)}</h1>
          <p style="margin:12px 0 0;color:rgba(255,255,255,.72);font-size:15px;line-height:1.55;">${escapeHtml(summary)}</p>
        </div>
        <div style="padding:28px 30px;">
          <h2 style="margin:0 0 14px;font-family:Georgia,serif;font-size:22px;color:#101f33;">Lead Snapshot</h2>
          ${allFieldsHtml}
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px;">
            ${mailLink ? `<a href="${escapeHtml(mailLink)}" style="display:inline-block;padding:12px 18px;background:#00355a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:900;">Email Customer</a>` : ""}
            ${phoneLink ? `<a href="${escapeHtml(phoneLink)}" style="display:inline-block;padding:12px 18px;background:#ffd51e;color:#00355a;text-decoration:none;border-radius:8px;font-weight:900;">Call Customer</a>` : ""}
          </div>
        </div>
        <div style="padding:18px 30px;background:#edf0f3;color:#5f6876;font-size:12px;line-height:1.5;">
          Submitted from ${escapeHtml(params.page_url)} on ${escapeHtml(params.submitted_at)}. Reference: ${escapeHtml(params.reference)}.
        </div>
      </div>
    </div>
  `;
}

function buildTemplateParams({ type, reference, data, estimate }) {
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true
  });
  const meta = getPageMeta();
  const flatData = flattenLeadData(data);
  const flatEstimate = flattenLeadData(estimate, "estimate");
  const sourceFields = { ...flatData, ...flatEstimate };
  const isQuote = type === "Quote Request";
  const solarCapacity = estimate?.systemKw ? `${estimate.systemKw} kW` : sourceFields.solarCapacity || "Not provided";
  const monthlyBill = data?.bill ? `Rs. ${Number(data.bill).toLocaleString("en-IN")}` : sourceFields.monthlyEbBill || "Not provided";
  const hasEstimateValue = (key) => estimate && estimate[key] !== null && estimate[key] !== undefined;
  const allFields = {
    form_type: isQuote ? "New Solar Quote Request" : "New Contact Inquiry",
    reference,
    owner_email: OWNER_EMAIL,
    submitted_at: submittedAt,
    ...meta,
    ...sourceFields
  };
  const allFieldsHtml = buildAllFieldsHtml(allFields);
  const params = {
    to_email: OWNER_EMAIL,
    owner_email: OWNER_EMAIL,
    form_type: allFields.form_type,
    reference,
    submitted_at: submittedAt,
    submittedAt,
    page_url: meta.page_url,
    user_source: meta.user_source,
    user_agent: meta.user_agent,
    logo_url: meta.logo_url,
    from_name: data?.fullName || data?.name || "Not provided",
    from_email: data?.email || "Not provided",
    reply_to: data?.email || OWNER_EMAIL,
    phone: data?.phone || "Not provided",
    location: data?.location || data?.city || "Not provided",
    subject: data?.subject || data?.project || data?.serviceType || type,
    message: data?.message || data?.additionalInfo || "Not provided",
    preferred_contact: data?.preferredContact || "Not provided",
    residential_commercial: data?.audience || data?.sector || "Not provided",
    property_type: data?.sector || data?.audience || "Not provided",
    service_type: data?.serviceType || data?.project || (isQuote ? "Rooftop Solar Quote" : "General Inquiry"),
    roof_type: data?.rooftop || "Not provided",
    connection_type: data?.connection || "Not provided",
    solar_capacity: solarCapacity,
    required_capacity: solarCapacity,
    budget_range: data?.budgetRange || "Not provided",
    monthly_eb_bill: monthlyBill,
    rooftop_area: data?.area ? `${Number(data.area).toLocaleString("en-IN")} sq. ft` : "Not provided",
    installation_timeline: data?.installationTimeline || "Not provided",
    selected_plan: data?.selectedPlan || data?.package || "Not provided",
    additional_information: data?.additionalInfo || data?.message || "Not provided",
    accepted_terms: formatValue(data?.accepted),
    estimated_annual_savings: hasEstimateValue("annualSavings") ? formatMoney(estimate.annualSavings) : "Not provided",
    estimated_project_cost: hasEstimateValue("projectCost") ? formatMoney(estimate.projectCost) : "Not provided",
    estimated_payback: hasEstimateValue("payback") ? `${estimate.payback} Years` : "Not provided",
    eligible_subsidy: hasEstimateValue("subsidy") ? formatMoney(estimate.subsidy) : "Not provided",
    all_fields: buildAllFieldsBlock(allFields),
    all_fields_html: allFieldsHtml,
    all_fields_json: JSON.stringify(allFields, null, 2)
  };

  params.email_body_html = buildPremiumEmailHtml({
    heading: params.form_type,
    summary: isQuote
      ? `${params.from_name} requested a solar quote for a ${params.property_type} property.`
      : `${params.from_name} submitted a website inquiry for ${params.service_type}.`,
    params,
    allFieldsHtml
  });
  params.email_body = params.all_fields;

  return params;
}

async function submitLead({ type, reference, data, estimate }) {
  assertEmailJsConfig();

  const templateParams = buildTemplateParams({ type, reference, data, estimate });
  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: type === "Quote Request" ? EMAILJS_QUOTE_TEMPLATE_ID : EMAILJS_CONTACT_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams
    })
  });

  if (!response.ok) {
    throw new Error("We could not send your request right now. Please try again or call +91 70940-96012.");
  }

  return templateParams;
}

export { makeReference, submitLead };
