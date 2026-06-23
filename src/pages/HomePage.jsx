import React from "react";
import { ArrowRight, Home, ShieldCheck } from "lucide-react";
import { DarkCta, Hero, HomeMetrics, MediaImage, SectionTitle, Stat } from "../components/ui";
import { homeAboutImage, homeAssetManagementImage, homeHeroImage, homeHeroVideo, homeStrategicImage, homeUtilityInfrastructureImage } from "../assets";

function HomePage({ navigate }) {
  return (
    <main>
      <Hero className="hero-home" bgVideo={homeHeroVideo} eyebrow="Premium Renewable Solutions" title="Your Trusted Partner in Clean & Reliable Solar Energy" copy="Life Bess is a professionally driven renewable energy company dedicated to harnessing the limitless potential of solar power for a sustainable future. With a strong foundation in engineering excellence and industry expertise, we provide end-to-end solar solutions that meet global standards of quality and performance." primary="Consult with Experts" secondary="View Our Portfolio" onPrimary={() => navigate("quote")} onSecondary={() => navigate("projects")} onStoryClick={() => navigate("about")} />
      <HomeMetrics />
      <section className="split-section home-about-section">
        <div className="editorial-copy">
          <h2>Infrastructure-Grade Excellence in Renewable Energy</h2>
          <p>Our core focus spans Engineering, Procurement, and Construction (EPC), project development, and seamless system integration—ensuring every project we deliver is reliable, efficient, and tailored to our clients’ unique requirements.</p>
          <p>As a forward-looking corporate entity, Life Bess stands at the forefront of India’s clean energy revolution. We combine innovation, advanced technology, and a customer-first approach to deliver solar solutions that empower residential, commercial, and industrial sectors. Beyond installations, we emphasize long-term value creation through lifetime service support, ensuring trust, sustainability, and energy independence for our clients. With a clear mission to accelerate the adoption of renewable energy, we are not just powering businesses and homes—we are shaping a greener tomorrow for generations to come.</p>
          <div className="stat-pair"><Stat className="proof-stat" value="15+" label="Years Experience" /><Stat className="proof-stat" value="2.5 GW" label="Energy Delivered" /></div>
        </div>
        <div className="media-frame with-badge"><MediaImage src={homeAboutImage} type="engineer" /><div className="floating-note"><ShieldCheck size={23} /><strong>Revolutionizing energy infrastructure through global expertise and innovation.</strong></div></div>
      </section>
      <section className="section home-capabilities">
        <SectionTitle eyebrow="Our Capabilities" title="Tailored Solutions for Complex Challenges" />
        <div className="capability-mosaic">
          <article className="mosaic-card dark large"><MediaImage src={homeUtilityInfrastructureImage} type="factory" /><div><h3>Utility-Scale Infrastructure</h3><p>Leading the way in grid-scale energy projects. We provide comprehensive EPC services for massive solar installations that power cities and industries.</p><button className="button button-yellow" onClick={() => navigate("utility")}>Explore Utility Solutions <ArrowRight size={17} /></button></div></article>
          <article className="mosaic-card light"><MediaImage src={homeStrategicImage} type="desk" /><h3>Strategic Development</h3><p>Identifying high-yield opportunities and navigating complex regulatory landscapes for maximized ROI.</p><button className="link-button dark-link">Learn More <ArrowRight size={15} /></button></article>
          <article className="mosaic-card outline"><Home size={32} /><h3>Residential Solar (PM Surya Ghar)</h3><p>Sustainable home energy solutions integrated with government schemes like PM Surya Ghar. Experience lower bills and clean power.</p><button className="button button-outline" onClick={() => navigate("residential")}>Explore Home Solar <ArrowRight size={17} /></button></article>
          <article className="mosaic-card dark wide"><div><h3>Ongoing Asset Management</h3><p>We continue long after installation with real-time monitoring and proactive maintenance to ensure peak efficiency.</p><button className="link-button" onClick={() => navigate("services")}>Explore Monitoring Plans <ArrowRight size={16} /></button></div><MediaImage src={homeAssetManagementImage} type="battery" /></article>
        </div>
      </section>
      <DarkCta image={homeHeroImage} title="Ready to Secure Your Energy Future?" copy="Join the world's most innovative companies in adopting clean, reliable, and high-performance solar infrastructure." button="Request a Quote" onClick={() => navigate("quote")} withEmail />
    </main>
  );
}

export { HomePage };
