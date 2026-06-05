import React from "react";
import { BatteryCharging, Building2, Wrench } from "lucide-react";
import { Checklist, CountUpText, DarkCta, Hero, InfoCard, MediaImage, SectionTitle } from "../components/ui";
import { buildingGlassSolarCampusImage, homeAboutImage, productHeroImage, serviceEngineeringLiaisonImage, solarEngineersInspectionImage } from "../assets";

function AboutPage({ navigate }) {
  return (
    <main>
      <Hero className="hero-about compact-hero" bgImage={homeAboutImage} eyebrow="Established Infrastructure" title="Powering the Future Through Heritage." />
      <section className="split-section">
        <div className="editorial-copy"><p className="eyebrow muted">Our Core Mission</p><h2>Harvesting Solar Energy with Integrity and Precision.</h2><p>Founded in 2014, Life Bess entered the renewable energy sector with a clear mission – to harvest solar energy and provide customers with world-class quality products and solutions. Over the years, the company has established itself as a trusted name by combining technical expertise with a strong commitment to sustainability. Backed by more than a decade of experienced Staffs and Engineers in the renewable energy industry, we have continually evolved to deliver solutions that not only meet but exceed customer expectations.</p></div>
        <div className="media-frame with-small-badge"><MediaImage src={solarEngineersInspectionImage} type="engineer" /><div className="small-badge"><strong><CountUpText className="metric-number metric-number-proof" value="10+" /></strong><span>Years of Expertise</span></div></div>
      </section>
      <section className="section section-grey"><SectionTitle eyebrow="The Ecosystem" title="A Central Hub for Energy Professionals" copy="Life Bess takes pride in being your ultimate ally in the world of energy. As a dedicated hub catering to electrical contractors, system integrators, electricians, EV dealers, battery and inverter shops, and proudly recognized as leading well experience team holding company , we're poised to supercharge your endeavors." /><div className="three-grid"><InfoCard icon={Wrench} title="Contractors" copy="Access to tier-1 inventory and comprehensive installation support for large-scale deployments." /><InfoCard icon={BatteryCharging} title="Integrators" copy="Sophisticated modular systems designed for seamless grid integration." /><InfoCard icon={Building2} title="Dealers" copy="Exclusive resources to lead the local energy transition." /></div></section>
      <section className="split-section reverse"><div className="media-frame"><MediaImage src={buildingGlassSolarCampusImage || serviceEngineeringLiaisonImage} type="building" /></div><div className="editorial-copy"><p className="eyebrow muted">Technical Heritage</p><h2>Engineered for Permanence.</h2><p>Life Bess isn't just a platform; we're your conduit to empowerment, innovation, and triumph in the realm of energy. Embark on this transformative journey with us and energize your path to success & to contribute our nation.</p><Checklist items={["Rigorous Validation", "Smart Monitoring", "Legacy Compatibility"]} /><MediaImage src={productHeroImage} type="lab" className="short-media" /></div></section>
      <DarkCta image={homeAboutImage} title="Ready to engineer your energy future?" copy="Life Bess isn't just a platform; we're your conduit to empowerment, innovation, and triumph in the realm of energy." button="Partner with Us" onClick={() => navigate("quote")} />
    </main>
  );
}

export { AboutPage };

