import React, { useState } from "react";
import { ArrowRight, ChevronDown, Clock3, Zap } from "lucide-react";
import { DarkCta, MediaImage, Testimonial } from "../components/ui";
import { buildingGlassSolarCampusImage, projectCiImage, projectIndustrialBessImage, projectLogisticsImage, projectResidentialImage, projectRuralEstateImage, projectUtilityImage, utilityLandscapeImage, projectHeroImage } from "../assets";

function ProjectsPage({ navigate }) {
  const [category, setCategory] = useState("All Projects");
  const [region, setRegion] = useState("All Regions");
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const projects = [
    { tag: "Utility", region: "Americas", title: "Arizona Solar Array BESS", power: "250 MW", metric: "100% Carbon Neutral", copy: "Providing grid stability and peak-shaving for over 50,000 households in the Southwest region.", type: "solar", image: projectUtilityImage },
    { tag: "C&I", region: "Americas", title: "Nexus Corporate Campus", power: "2.5 MW", metric: "45% Cost Reduction", copy: "Integrated microgrid solution for a tech headquarters, ensuring uninterrupted operations.", type: "building", image: projectCiImage },
    { tag: "Residential", region: "Asia Pacific", title: "Silver Coast Eco-Estate", power: "15 kW", metric: "24/7 Autonomy", copy: "Smart BESS installation for a premium private residence, optimizing solar self-consumption.", type: "home", image: projectResidentialImage },
    { tag: "Utility", region: "Europe", title: "Munich Grid Stability Hub", power: "100 MW", metric: "20ms Response", copy: "Fast-frequency response system providing critical backup for the Bavarian regional grid.", type: "battery", image: projectIndustrialBessImage },
    { tag: "C&I", region: "Europe", title: "Global Logistics Port", power: "8 MW", metric: "1,200 Tons CO2 Saved", copy: "Electrification of port operations through large-scale containerized energy storage units.", type: "panels", image: projectLogisticsImage },
    { tag: "Residential", region: "Asia Pacific", title: "Alpine Retreat Microgrid", power: "30 kW", metric: "Off-grid Ready", copy: "Total energy independence for a remote luxury estate using advanced lithium-ion technology.", type: "roof", image: projectRuralEstateImage },
    { tag: "Utility", region: "Asia Pacific", title: "Tamil Nadu Storage Corridor", power: "180 MW", metric: "Grid Support", copy: "Hybrid solar-plus-storage corridor designed to stabilize peak demand across industrial energy clusters.", type: "panels", image: utilityLandscapeImage },
    { tag: "C&I", region: "Americas", title: "Helios Manufacturing Park", power: "6 MW", metric: "38% Bill Reduction", copy: "Behind-the-meter solar and BESS installation supporting uninterrupted production for a multi-building campus.", type: "building", image: buildingGlassSolarCampusImage }
  ];
  const filteredProjects = projects.filter((project) => (category === "All Projects" || project.tag === category) && (region === "All Regions" || project.region === region));
  const visibleProjects = category === "All Projects" && region === "All Regions" && !showMoreProjects ? filteredProjects.slice(0, 6) : filteredProjects;
  const canExpandProjects = category === "All Projects" && region === "All Regions" && filteredProjects.length > 6;
  const updateCategory = (item) => { setCategory(item); setShowMoreProjects(false); };
  const updateRegion = (item) => { setRegion(item); setShowMoreProjects(false); };
  return (
    <main>
      <section className="projects-intro"><p className="eyebrow muted">Global Portfolio</p><h1>Powering Excellence Across the Globe</h1><p>Explore our transformative renewable energy installations, from utility-scale battery storage to premium residential solutions.</p><div className="project-controls"><div>{["All Projects", "Residential", "C&I", "Utility"].map((item) => <button className={category === item ? "is-active" : ""} key={item} onClick={() => updateCategory(item)}>{item}</button>)}</div><label className="region-select"><select value={region} onChange={(event) => updateRegion(event.target.value)}>{["All Regions", "Americas", "Europe", "Asia Pacific"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={17} /></label></div></section>
      <section className="project-grid-section">{visibleProjects.map((project, index) => <article className={index >= 6 ? "project-card project-card-extra" : "project-card"} key={project.title}><MediaImage src={project.image} type={project.type} /><span>{project.tag}</span><h3>{project.title}</h3><p className="meta"><Zap size={14} /> {project.power} <Clock3 size={14} /> {project.metric}</p><p>{project.copy}</p></article>)}{filteredProjects.length === 0 && <p className="empty-state">No projects match this filter yet.</p>}{canExpandProjects && <button className="button button-outline centered" onClick={() => setShowMoreProjects((value) => !value)}>{showMoreProjects ? "Show Less Projects" : "View More Projects"}<ArrowRight size={16} /></button>}</section>
      <section className="testimonials"><div><p className="eyebrow muted">Testimonials</p><h2>Partnering with Industry Leaders</h2><p>Our success is measured by the trust and reliability we provide to our corporate and utility partners worldwide.</p></div><Testimonial name="Marcus Thorne" role="CTO, Global Energy Solutions" /><Testimonial name="Sarah Jenkins" role="Director of Sustainability, Nexus Corp" /></section>
      <DarkCta image={projectHeroImage} title="Ready to Power Your Next Project?" copy="Consult with our expert engineers to design a bespoke energy storage solution tailored to your operational needs." button="Start Inquiry" onClick={() => navigate("quote")} />
    </main>
  );
}

export { ProjectsPage };

