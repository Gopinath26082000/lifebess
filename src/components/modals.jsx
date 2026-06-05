import React, { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, Download, Landmark, Mail, MapPin, Phone, ShieldCheck, X } from "lucide-react";
import { calculateEligibility, formatMoney, rangePercent } from "../utils/calculations";
import { makeReference } from "../utils/leads";
import { Checklist, CountUpText, IconLine, MediaImage, Stat, Table } from "./ui";
import { projectUtilityImage, productPanelsImage } from "../assets";

function Modal({ children, onClose, wide = false }) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return <div className="modal-backdrop" onClick={onClose}><div className={wide ? "modal-window wide" : "modal-window"} onClick={(event) => event.stopPropagation()}>{children}</div></div>;
}

function ContactModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ audience: "Enterprise", name: "", email: "", phone: "", location: "", organization: "", subject: "", preferredContact: "Phone", project: "Commercial BESS Installation", message: "" });
  const [submitState, setSubmitState] = useState({ loading: false, error: "" });
  const update = (patch) => setForm((current) => ({ ...current, ...patch }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ loading: true, error: "" });
    try { await onSuccess(form); } catch (error) { setSubmitState({ loading: false, error: error.message }); }
  };
  return (
    <Modal onClose={onClose} wide>
      <div className="contact-modal">
        <aside>
          <h2>Life Bess</h2><h3>Partnering in Sustainable Excellence</h3>
          <p>Connect with our executive consultants to tailor a high-capacity energy strategy for your portfolio.</p>
          <IconLine icon={Mail} text="info@lifebess.com" /><IconLine icon={Phone} text="+91 70940-96012" /><IconLine icon={MapPin} text="Life Bess Pvt. Ltd Adambakkam, Chennai - 600088" />
          <MediaImage src={projectUtilityImage} type="panels" />
        </aside>
        <form onSubmit={handleSubmit}>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close"><X size={29} /></button>
          <h1>Expert Guidance for Your Solar Future</h1>
          <div className="segment-row">
            <button type="button" className={form.audience === "Enterprise" ? "is-selected" : ""} onClick={() => update({ audience: "Enterprise", project: "Commercial BESS Installation" })}><span>Strategic</span>Enterprise</button>
            <button type="button" className={form.audience === "Residential" ? "is-selected" : ""} onClick={() => update({ audience: "Residential", project: "Residential Rooftop Solar" })}><span>Private</span>Residential</button>
          </div>
          <div className="two-grid tight">
            <label className="field">Full Name<input required value={form.name} onChange={(event) => update({ name: event.target.value })} placeholder="Alexander Thorne" /></label>
            <label className="field">Professional Email<input required type="email" value={form.email} onChange={(event) => update({ email: event.target.value })} placeholder="a.thorne@nexus-corp.com" /></label>
            <label className="field">Phone Number<input required value={form.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="+91 70940-96012" /></label>
            <label className="field">Location / City<input value={form.location} onChange={(event) => update({ location: event.target.value })} placeholder="Chennai" /></label>
            <label className="field">Organization<input value={form.organization} onChange={(event) => update({ organization: event.target.value })} placeholder="Nexus Infrastructure" /></label>
            <label className="field">Preferred Contact<select value={form.preferredContact} onChange={(event) => update({ preferredContact: event.target.value })}><option>Phone</option><option>Email</option><option>WhatsApp</option></select></label>
            <label className="field">Subject<input value={form.subject} onChange={(event) => update({ subject: event.target.value })} placeholder="Solar consultation request" /></label>
            <label className="field">Project Type<span><input value={form.project} onChange={(event) => update({ project: event.target.value })} /><ChevronDown size={20} /></span></label>
          </div>
          <label className="field full-field">Project Message<textarea value={form.message} onChange={(event) => update({ message: event.target.value })} placeholder="Briefly describe your energy requirements and site specifications..." /></label>
          {submitState.error && <p className="form-alert">{submitState.error}</p>}
          <div className="modal-progress"><span /></div>
          <div className="modal-footer"><span>01/02</span><button className="button button-dark" disabled={submitState.loading}>{submitState.loading ? "Sending Inquiry..." : "Initialize Inquiry"} <ArrowRight size={21} /></button></div>
        </form>
      </div>
    </Modal>
  );
}

function ContactSuccessModal({ reference, onClose }) {
  const displayReference = reference || makeReference("LB");
  return (
    <Modal onClose={onClose}>
      <div className="success-modal">
        <div className="success-side"><MediaImage src={productPanelsImage} type="panels" /><span><ShieldCheck size={24} /> System Active</span></div>
        <div className="success-main"><button type="button" className="close-button" onClick={onClose} aria-label="Close"><X size={32} /></button><div className="success-icon"><Check size={38} /></div><h1>Inquiry Received</h1><p>Our executive consultants have received your project details. We will review your requirements and connect with you within 24 business hours to discuss the next steps.</p><div className="reference-box"><span>Inquiry Reference</span><strong>{displayReference}</strong></div><button className="button button-dark" onClick={onClose}>Back to Site <ArrowRight size={22} /></button><p className="secure-line">Encrypted & Secure Submission</p></div>
      </div>
    </Modal>
  );
}

function EligibilityCalculatorModal({ onClose, onSuccess }) {
  const billOptions = [{ label: "< Rs. 1,000", value: 900 }, { label: "Rs. 1k - 2k", value: 1500 }, { label: "Rs. 2k - 5k", value: 3500 }, { label: "Rs. 5,000+", value: 6500 }];
  const [details, setDetails] = useState({ pincode: "", bill: 3500, area: 500 });
  const update = (patch) => setDetails((current) => ({ ...current, ...patch }));
  const estimate = calculateEligibility(details);
  const areaPercent = rangePercent(details.area, 50, 5000);
  return (
    <Modal onClose={onClose}>
      <form className="eligibility-modal" onSubmit={(event) => { event.preventDefault(); onSuccess({ details, estimate }); }}>
        <button type="button" className="close-button" onClick={onClose} aria-label="Close"><X size={30} /></button>
        <header><h1>Check Your Eligibility</h1><p>PM Surya Ghar Muft Bijli Yojana</p></header>
        <div className="modal-body">
          <label className="field icon-field">Pin Code<span><MapPin size={25} /><input value={details.pincode} onChange={(event) => update({ pincode: event.target.value })} placeholder="e.g. 110001" /></span></label>
          <p className="form-label">Average Monthly Electricity Bill</p>
          <div className="bill-grid">{billOptions.map((option) => <button type="button" className={details.bill === option.value ? "is-selected" : ""} key={option.label} onClick={() => update({ bill: option.value })}>{option.label}</button>)}</div>
          <div className="range-head smaller"><p className="form-label">Available Rooftop Space (sq. ft.)</p><strong>{Number(details.area).toLocaleString("en-IN")}</strong></div>
          <input className="real-range eligibility-real-range" style={{ "--range-progress": `${areaPercent}%` }} type="range" min="50" max="5000" step="50" value={details.area} onChange={(event) => update({ area: event.target.value })} aria-label="Available Rooftop Space" />
          <div className="range-labels"><span>50 Sq. Ft.</span><span>5,000 Sq. Ft.</span></div>
          <div className="pro-tip">Estimated {estimate.systemKw} kW rooftop system, {formatMoney(estimate.subsidy)} subsidy, and {formatMoney(estimate.annualSavings)} yearly savings.</div>
        </div>
        <footer><button className="button button-yellow">Calculate Subsidy & Savings <ArrowRight size={25} /></button><button type="button" className="button button-outline" onClick={onClose}>Cancel</button></footer>
      </form>
    </Modal>
  );
}

function EligibilityResultsDynamicModal({ result, onClose, navigate }) {
  const fallback = { details: { area: 500 }, estimate: calculateEligibility({ bill: 3500, area: 500 }) };
  const { details, estimate } = result || fallback;
  return (
    <Modal onClose={onClose} wide>
      <div className="results-modal">
        <button type="button" className="close-button" onClick={onClose} aria-label="Close"><X size={26} /></button>
        <header><h1>Your Savings Analysis</h1><p>Live residential subsidy estimate</p></header>
        <div className="results-body">
          <div className="results-left">
            <div className="subsidy-result"><div><h2>Estimated Subsidy</h2><p>Direct government incentive for your installation</p></div><strong><CountUpText value={formatMoney(estimate.subsidy)} /></strong><span>Live Estimate</span><div className="result-metrics"><Stat value={`${estimate.systemKw}kW Rooftop`} label="Recommended System" /><Stat value={`${formatMoney(estimate.annualSavings)}+`} label="Annual Savings" /><Stat value={`${estimate.payback} Years`} label="Payback Period" /></div></div>
            <div className="result-cards"><div className="finance-card"><h3><Landmark size={23} /> Finance Options</h3><Checklist items={["100% Collateral-free", "Zero Downpayment", "Tenure up to 7 years"]} /><div><span>Projected Monthly EMI</span><strong><CountUpText value={formatMoney(estimate.emi)} /></strong><em>after subsidy estimate</em></div></div><div className="impact-card"><h3>Environmental Impact</h3><div><Stat value={String(estimate.trees)} label="Trees/Yr" /><Stat value={String(estimate.yearlyCo2)} label="Tons/Yr" /><Stat value={String(estimate.yearlyGeneration)} label="kWh/Yr" /></div></div></div>
          </div>
          <aside className="lock-card"><h3>Lock in Savings</h3><p>Your quote is valid for 14 days based on current utility rates.</p><button className="button button-yellow" onClick={() => navigate("quote")}>Get Final Quote <ArrowRight size={19} /></button><button className="button button-outline"><Download size={19} /> Download Report</button></aside>
        </div>
        <Table rows={[["Sanctioned Load", estimate.sanctionedLoad], ["Shadow-Free Area", `~${Number(details.area).toLocaleString("en-IN")} Sq. Ft.`], ["Credit Eligibility", "Subject to lender approval"]]} headings={["Eligibility Specification", ""]} />
      </div>
    </Modal>
  );
}

export { ContactModal, ContactSuccessModal, EligibilityCalculatorModal, EligibilityResultsDynamicModal };

