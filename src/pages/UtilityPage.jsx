import React from "react";
import { ArrowDown } from "lucide-react";
import { Checklist, DarkCta, ImageCard, MediaImage, MiniList, SectionTitle, Stat } from "../components/ui";
import { homeAssetManagementImage, serviceSiteFeasibilityImage, serviceTransmissionImage, utilityLandscapeImage } from "../assets";

function UtilityPage({ navigate }) {
  return (
    <main>
      <section className="utility-hero"><div><p className="eyebrow muted">Pioneering Utility-Scale Energy</p><h1>Grid-Scale Excellence in <span>Renewable Infrastructure</span></h1><p>Deploying high-capacity solar installations with institutional-grade reliability.</p><button className="button button-yellow" onClick={() => navigate("projects")}>Explore Our Projects</button></div><div className="scroll-note"><ArrowDown size={16} /> Scroll to Discover</div></section>
      <div className="partner-strip">Strategic Grid Partnerships <span>MNRE</span><span>TANGEDCO</span><span>SECI</span><span>POWERGRID</span><span>IREDA</span></div>
      <section className="split-section"><div><p className="eyebrow muted">Regulatory Navigators</p><h2>Unlocking Potential through Expert Liaison</h2><p>Navigating government bodies and regulatory requirements is our core strength. We ensure seamless project approvals and grid connectivity.</p><MiniList items={["Feasibility & Compliance: site assessments and impact studies", "Interconnection Agreements: high-voltage documentation and PPA fulfillment"]} /></div><div className="media-frame outline-media"><MediaImage src={serviceTransmissionImage} type="worker" /></div></section>
      <section className="section section-grey"><SectionTitle title="Core Grid Capabilities" /><div className="three-grid image-cards"><ImageCard title="Transmission Systems" type="grid" image={serviceTransmissionImage} /><ImageCard title="Site Feasibility" type="solar" image={serviceSiteFeasibilityImage} /><ImageCard title="O&M Excellence" type="control" image={homeAssetManagementImage} /></div></section>
      <section className="number-band"><Stat value="2.5+ GW" label="Commissioned Capacity" /><Stat value="150+" label="Grid Interconnections" /><Stat value="99.8%" label="System Availability" /><Stat value="12+" label="State Body Approvals" /></section>
      <section className="split-block"><div><h2>Standardizing Global Energy Transition</h2><p>Our approach to utility-scale solar is rooted in infrastructure-grade excellence. We architect energy independence.</p><Checklist items={["MNRE Level 1 Certified Partner", "End-to-end TANGEDCO Liaison", "Specialized HV Transmission Division"]} /></div><MediaImage src={utilityLandscapeImage} type="aerial" /></section>
      <DarkCta image={utilityLandscapeImage} title="Ready to scale your energy infrastructure?" copy="Plan open access, grid-scale, and industrial solar projects with a team built for approvals, EPC, and long-term performance." button="Start Utility Inquiry" onClick={() => navigate("quote")} />
    </main>
  );
}

export { UtilityPage };

