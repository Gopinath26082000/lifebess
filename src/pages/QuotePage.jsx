import React, { useState } from "react";
import { ArrowRight, Building2, Home, ShieldCheck } from "lucide-react";
import { Footer, JourneyHeader } from "../components/layout";
import { calculateQuote, formatMoney, rangePercent } from "../utils/calculations";
import { makeReference, submitLead } from "../utils/leads";
import { ChoiceCard, CountUpText, MediaImage, MiniList, ProgressBar, ProgressDots, Timeline } from "../components/ui";
import { productPanelsImage, serviceSiteFeasibilityImage } from "../assets";

function QuotePage({ step, setStep, navigate, setAuditRef }) {
  const [quote, setQuote] = useState({
    sector: "Residential",
    serviceType: "Rooftop Solar Installation",
    bill: "5000",
    rooftop: "RCC",
    connection: "Three Phase",
    area: "500",
    budgetRange: "To be discussed",
    installationTimeline: "Within 30 days",
    preferredContact: "Phone",
    selectedPlan: "Custom Solar Consultation",
    fullName: "",
    phone: "",
    email: "",
    city: "",
    pincode: "",
    additionalInfo: "",
    accepted: false
  });
  const [submitState, setSubmitState] = useState({ loading: false, error: "" });
  const updateQuote = (patch) => setQuote((current) => ({ ...current, ...patch }));
  const submitQuote = async () => {
    const reference = makeReference("LB");
    const estimate = calculateQuote(quote);
    setSubmitState({ loading: true, error: "" });
    try {
      await submitLead({ type: "Quote Request", reference, data: quote, estimate });
      setAuditRef(reference);
      navigate("submitted");
    } catch (error) {
      setSubmitState({ loading: false, error: error.message });
    }
  };

  return (
    <main className="quote-page">
      <JourneyHeader navigate={navigate} />
      {step === 1 && <QuoteStepOne quote={quote} updateQuote={updateQuote} onNext={() => setStep(2)} />}
      {step === 2 && <QuoteStepTwo quote={quote} updateQuote={updateQuote} onNext={() => setStep(3)} onPrev={() => setStep(1)} />}
      {step === 3 && <QuoteStepThree quote={quote} updateQuote={updateQuote} onSubmit={submitQuote} submitState={submitState} />}
      <Footer navigate={navigate} setModal={() => {}} minimal={true} />
    </main>
  );
}

function QuoteStepOne({ quote, updateQuote, onNext }) {
  return (
    <section className="quote-layout step-one">
      <div className="quote-title-row">
        <div><p className="eyebrow black">Site Audit Request</p><h1>Switch to Sustainable Energy</h1></div>
        <ProgressDots step="one" label="Step 1 of 3" />
      </div>
      <div className="quote-grid">
        <div className="quote-card">
          <h2>Select Your Sector</h2>
          <p>We tailor our energy solutions based on the scale and complexity of your requirements.</p>
          <div className="sector-grid">
            <ChoiceCard selected={quote.sector === "Residential"} icon={Home} title="Residential" copy="Homeowners and residential complexes seeking energy independence." onClick={() => updateQuote({ sector: "Residential" })} />
            <ChoiceCard selected={quote.sector === "Commercial"} icon={Building2} title="Commercial" copy="Enterprises, industries, and warehouses requiring high-scale BESS." onClick={() => updateQuote({ sector: "Commercial" })} />
          </div>
          <div className="quote-card-footer"><button className="button button-dark" onClick={onNext}>Continue</button></div>
        </div>
        <aside className="quote-side">
          <div className="cert-card small"><h3>Certified Reliability</h3><MiniList items={["ISO 9001:2015 Quality Management", "MNRE Approved Govt. Certified"]} dark /></div>
          <div className="next-card"><h2>What happens next?</h2><Timeline items={["Virtual Assessment", "On-Site Visit", "Detailed Proposal"]} /></div>
          <MediaImage src={serviceSiteFeasibilityImage} type="panels" className="quote-side-media" />
        </aside>
      </div>
    </section>
  );
}

function QuoteStepTwo({ quote, updateQuote, onNext, onPrev }) {
  const estimate = calculateQuote(quote);
  const billPercent = rangePercent(quote.bill, 500, 50000);
  const areaPercent = rangePercent(quote.area, 100, 5000);

  return (
    <section className="quote-layout step-two">
      <div className="quote-top-progress">
        <p className="eyebrow muted">Step 2 of 3</p>
        <h1>Site Details</h1>
        <ProgressBar className="two" label="66% Complete" />
      </div>
      <div className="quote-grid">
        <div className="quote-card">
          <div className="range-head"><h2>Monthly Electricity Bill</h2><strong>Rs. {Number(quote.bill).toLocaleString("en-IN")}</strong></div>
          <input className="real-range" style={{ "--range-progress": `${billPercent}%` }} type="range" min="500" max="50000" step="500" value={quote.bill} onChange={(event) => updateQuote({ bill: event.target.value })} aria-label="Monthly Electricity Bill" />
          <div className="range-labels"><span>Rs. 500</span><span>Rs. 50,000+</span></div>
          <div className="button-groups">
            <div><p className="form-label">Rooftop Type</p>{["Flat", "Shed", "RCC"].map((item) => <button type="button" className={quote.rooftop === item ? "is-selected" : ""} key={item} onClick={() => updateQuote({ rooftop: item })}>{item}</button>)}</div>
            <div><p className="form-label">Connection Type</p>{["Single Phase", "Three Phase"].map((item) => <button type="button" className={quote.connection === item ? "is-selected" : ""} key={item} onClick={() => updateQuote({ connection: item })}>{item}</button>)}</div>
          </div>
          <div className="range-head range-head-secondary"><h2>Available Rooftop Area</h2><strong>{Number(quote.area).toLocaleString("en-IN")} sq. ft</strong></div>
          <input className="real-range" style={{ "--range-progress": `${areaPercent}%` }} type="range" min="100" max="5000" step="50" value={quote.area} onChange={(event) => updateQuote({ area: event.target.value })} aria-label="Available Rooftop Area" />
          <div className="range-labels"><span>100 sq. ft</span><span>5,000 sq. ft</span></div>
          <div className="quote-card-footer between"><button className="ghost-button" onClick={onPrev}>Previous Step</button><button className="button button-dark" onClick={onNext}>Next: Quote Review</button></div>
        </div>
        <aside className="quote-side">
          <div className="cert-card">
            <h2>What's Next?</h2>
            <Timeline items={["Review Quote", "Expert Consultation"]} start={3} />
            <div className="quote-estimate-mini"><span>Estimated System</span><strong>{estimate.systemKw} kW</strong><em>{formatMoney(estimate.annualSavings)} annual savings</em></div>
          </div>
          <div className="tip-card"><p className="form-label">Site Feasibility Tip</p><MediaImage src={productPanelsImage} type="panels" /><p>An average 3kW system requires approximately 300 sq. ft of shadow-free area.</p></div>
        </aside>
      </div>
    </section>
  );
}

function QuoteStepThree({ quote, updateQuote, onSubmit, submitState }) {
  const estimate = calculateQuote(quote);

  return (
    <section className="quote-layout step-three">
      <div className="single-progress"><span>Step 3 of 3</span><strong>Final Details</strong></div>
      <div className="quote-grid final">
        <form className="quote-card final-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
          <h1>Final Details</h1>
          <p>Complete your request for a personalized renewable energy quote.</p>
          <label className="field full-field">Full Name<input required value={quote.fullName} onChange={(event) => updateQuote({ fullName: event.target.value })} placeholder="Alexander Sterling" /></label>
          <div className="two-grid tight">
            <label className="field">Phone Number<input required value={quote.phone} onChange={(event) => updateQuote({ phone: event.target.value })} placeholder="+91 70940-96012" /></label>
            <label className="field">Email Address<input required type="email" value={quote.email} onChange={(event) => updateQuote({ email: event.target.value })} placeholder="alex@corporate.com" /></label>
            <label className="field">City<input value={quote.city} onChange={(event) => updateQuote({ city: event.target.value })} placeholder="Chennai" /></label>
            <label className="field">Pincode / ZIP<input value={quote.pincode} onChange={(event) => updateQuote({ pincode: event.target.value })} placeholder="600088" /></label>
            <label className="field">Preferred Contact<select value={quote.preferredContact} onChange={(event) => updateQuote({ preferredContact: event.target.value })}><option>Phone</option><option>Email</option><option>WhatsApp</option></select></label>
            <label className="field">Installation Timeline<select value={quote.installationTimeline} onChange={(event) => updateQuote({ installationTimeline: event.target.value })}><option>Within 30 days</option><option>1 - 3 months</option><option>3 - 6 months</option><option>Planning stage</option></select></label>
            <label className="field">Budget Range<select value={quote.budgetRange} onChange={(event) => updateQuote({ budgetRange: event.target.value })}><option>To be discussed</option><option>Under Rs. 1 lakh</option><option>Rs. 1 - 3 lakhs</option><option>Rs. 3 - 6 lakhs</option><option>Rs. 6 lakhs+</option></select></label>
            <label className="field">Selected Plan<input value={quote.selectedPlan} onChange={(event) => updateQuote({ selectedPlan: event.target.value })} placeholder="Custom Solar Consultation" /></label>
          </div>
          <label className="field full-field">Additional Requirements<textarea value={quote.additionalInfo} onChange={(event) => updateQuote({ additionalInfo: event.target.value })} placeholder="Tell us about usage patterns, battery backup needs, timeline, or site constraints..." /></label>
          <label className="check-field"><input required type="checkbox" checked={quote.accepted} onChange={(event) => updateQuote({ accepted: event.target.checked })} /> <span>I agree to the <u>Terms of Service</u> and <u>Privacy Policy</u>.</span></label>
          <div className="privacy-box"><ShieldCheck size={22} /><p><strong>Data Privacy Guaranteed:</strong> Your information is encrypted and only used to provide your custom quote.</p></div>
          {submitState?.error && <p className="form-alert">{submitState.error}</p>}
          <button className="button button-dark submit-wide" disabled={submitState?.loading}>{submitState?.loading ? "Sending Request..." : "Submit Request"} <ArrowRight size={21} /></button>
        </form>
        <aside className="reliability-panel">
          <h2>Certified Reliability</h2>
          <p>We partner with recognized testing laboratories to ensure safety and efficiency.</p>
          <div className="quote-summary-card">
            <p>Calculated Quote Preview</p>
            <div><span>System Size</span><strong><CountUpText value={`${estimate.systemKw} kW`} /></strong></div>
            <div><span>Annual Savings</span><strong><CountUpText value={formatMoney(estimate.annualSavings)} /></strong></div>
            <div><span>Payback</span><strong><CountUpText value={`${estimate.payback} Years`} /></strong></div>
            {quote.sector === "Residential" && <div><span>Eligible Subsidy</span><strong><CountUpText value={formatMoney(estimate.subsidy)} /></strong></div>}
          </div>
          <MiniList items={["ISO 9001 CERTIFIED Quality Management System", "IEC 61215 STANDARD Durability & Performance Testing", "LEED COMPLIANT Sustainable Infrastructure Leader"]} dark />
          <p className="team-line">Join 2,400+ enterprises switching to Life Bess.</p>
        </aside>
      </div>
    </section>
  );
}

export { QuotePage };
