import React from "react";
import { Building2, Home, Landmark, ShieldCheck, Sun, Zap } from "lucide-react";
import { DarkCta, Checklist, MiniList, SectionTitle, Stat, StepCard } from "../components/ui";
import { productHomeKitImage, productInverterImage, residentialRooftopInstallImage, serviceSolarInstallImage } from "../assets";

const subsidyOptions = [
  {
    capacity: "1 kW",
    amount: "Rs. 30,000",
    generation: "120 - 150 units / month",
    homeType: "Studio / Small Apartment",
    Icon: Building2,
    tone: "compact"
  },
  {
    capacity: "2 kW",
    amount: "Rs. 60,000",
    generation: "240 - 300 units / month",
    homeType: "2-3 BHK Family House",
    Icon: Home,
    tone: "popular",
    badge: "Most Popular"
  },
  {
    capacity: "3+ kW",
    amount: "Rs. 78,000",
    suffix: "Maximum Benefit",
    generation: "360 - 450+ units / month",
    homeType: "Villa / Multi-Floor Home",
    Icon: ShieldCheck,
    tone: "max"
  }
];

function SubsidyBenefitSection({ onCheck }) {
  return (
    <section className="section section-grey subsidy-benefit-section">
      <SectionTitle
        eyebrow="PM Surya Ghar Scheme"
        title="Calculate Your Government Solar Benefit"
        copy="Discover how much subsidy you can receive under the PM Surya Ghar Scheme and choose the right solar system for your home."
      />
      <div className="subsidy-benefit-grid">
        {subsidyOptions.map(({ capacity, amount, suffix, generation, homeType, Icon, tone, badge }) => (
          <article className={`subsidy-benefit-card ${tone === "popular" ? "is-recommended" : ""}`} key={capacity}>
            {badge && <span className="subsidy-popular-badge">{badge}</span>}
            <div className="subsidy-card-top">
              <span className="capacity-badge"><Sun size={16} /> {capacity}</span>
              <span className="capacity-label">Rooftop Solar</span>
            </div>
            <div className="subsidy-card-amount">
              <strong>{amount}</strong>
              {suffix && <span>{suffix}</span>}
            </div>
            <div className="subsidy-card-generation">
              <Zap size={22} />
              <div><span>Typical Monthly Generation</span><strong>{generation}</strong></div>
            </div>
            <div className="subsidy-card-home">
              <Icon size={24} />
              <div><span>Ideal For</span><strong>{homeType}</strong></div>
            </div>
          </article>
        ))}
      </div>
      <div className="subsidy-trust-strip">
        <div className="trust-icon"><Landmark size={24} /></div>
        <p><strong>Government-backed benefit:</strong> Under the PM Surya Ghar Yojana, eligible homeowners can receive up to Rs. 78,000 in government subsidy, significantly reducing the upfront cost of solar installation.</p>
        <button className="button button-dark" onClick={onCheck}>Check My Exact Eligibility</button>
      </div>
    </section>
  );
}

function ResidentialPage({ navigate, setModal }) {
  return (
    <main>
      <section className="residential-hero"><div><p className="tag">PM-Surya Ghar Scheme</p><h1>Empowering Your Home with Pure Solar Energy</h1><p>Join the renewable revolution with Life Bess. Access government subsidies and reduce your electricity bills while contributing to a greener India.</p><div className="hero-actions"><button className="button button-yellow" onClick={() => setModal("eligibility")}>Check Subsidy Eligibility</button><button className="button button-outline light">Learn More</button></div></div></section>
      <section className="split-section"><div><h2>Government Subsidy Framework</h2><p>Under the PM-Surya Ghar: Muft Bijli Yojana, residential households can avail significant financial assistance for installing rooftop solar systems.</p><MiniList items={["1 kW - 2 kW Capacity: Subsidy of Rs. 30,000 to Rs. 60,000", "3 kW+ Capacity: Fixed subsidy of Rs. 78,000 for systems 3kW and above"]} /></div><div className="dark-card big"><h3>Why Choose Life Bess?</h3><Checklist items={["Seamless Subsidy Processing", "Tier-1 Monocrystalline Panels", "25-Year Performance Warranty", "Post-Installation Support"]} /><p className="eyebrow muted">Estimated Savings</p><strong>Up to Rs. 45,000/yr</strong><span>On a typical 3kW residential system</span></div></section>
      <section className="section section-grey"><SectionTitle eyebrow="The Journey" title="3 Steps to Energy Independence" /><div className="three-grid step-cards"><StepCard number="01" title="Site Survey" type="roof" image={residentialRooftopInstallImage} /><StepCard number="02" title="Installation" type="panels" image={serviceSolarInstallImage} /><StepCard number="03" title="Commissioning" type="inverter" image={productInverterImage} /></div></section>
      <section className="dark-section split-section compact"><div className="stats-grid"><Stat value="3-4 Years" label="Full ROI Timeline" /><Stat value="Rs. 3,500+" label="Estimated average" /><Stat value="25+ Yrs" label="Guaranteed output" /><Stat value="4.5 Tons" label="Annual per 3kW" /></div><div><h2>An Investment That Pays for Itself</h2><p>Switching to solar is a high-yield financial decision. With electricity tariffs rising, your Life Bess system becomes more valuable every year.</p><button className="button button-yellow" onClick={() => setModal("eligibility")}>Calculate Your Exact Savings</button></div></section>
      <SubsidyBenefitSection onCheck={() => setModal("eligibility")} />
      <DarkCta image={productHomeKitImage} title="Ready to make the switch?" copy="Our solar consultants are ready to help you navigate the subsidy application and design your custom rooftop solution." button="Schedule Free Consultation" secondary="Call Support: 70940960125" onClick={() => navigate("quote")} />
    </main>
  );
}

export { ResidentialPage };

