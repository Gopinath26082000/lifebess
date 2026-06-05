import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DarkCta, Hero, MediaImage, PerformanceMatrix } from "../components/ui";
import { mountingRailImage, productAccessoriesImage, productBatteryImage, productHomeKitImage, productInverterImage, productPanelsImage, productStreetLightImage, productWaterHeaterImage, productPageHeroImage } from "../assets";

function ProductsPage({ navigate, setModal }) {
  const [productFilter, setProductFilter] = useState("All Products");
  const [showMoreProducts, setShowMoreProducts] = useState(false);
  const products = [
    ["Solar Panels", "Solar Panels", productPanelsImage, "panels"],
    ["Solar Inverters", "Solar Inverters", productInverterImage, "inverter"],
    ["Solar Batteries ( Lithium/Lead Acid Batteries )", "Solar Batteries ( Lithium/Lead Acid Batteries )", productBatteryImage, "battery"],
    ["All Solar Accessories", "All Solar Accessories", productAccessoriesImage, "accessories"],
    ["MMS/Structures", "MMS/Structures", mountingRailImage, "mount"],
    ["Solar Street lights", "Solar Street lights", productStreetLightImage, "street"],
    ["Solar Water Heaters", "Solar Water Heaters", productWaterHeaterImage, "thermal"],
    ["Solar Mini Home Kits etc.", "Solar Mini Home Kits etc.", productHomeKitImage, "mini-kit"]
  ];
  const productGroups = { "All Products": "All Products", "Solar Panels": "Solar Panels", "Solar Inverters": "Solar Inverters", "Solar Batteries ( Lithium/Lead Acid Batteries )": "Solar Batteries ( Lithium/Lead Acid Batteries )", "MMS/Structures": "MMS/Structures", "Solar Water Heaters": "Solar Water Heaters" };
  const filteredProducts = products.filter(([category]) => productFilter === "All Products" || productGroups[productFilter] === category);
  const visibleProducts = productFilter === "All Products" && !showMoreProducts ? filteredProducts.slice(0, 6) : filteredProducts;
  const canExpandProducts = productFilter === "All Products" && filteredProducts.length > 6;
  return (
    <main>
      <Hero className="hero-products split-hero" bgImage={productPageHeroImage} eyebrow="Premium Renewable Solutions" title="Engineered for Global Energy Security" copy="Explore our curated selection of tier-one solar infrastructure components. From advanced lithium storage to high-efficiency PV modules, we provide the backbone for sustainable power." primary="Explore Our Projects" secondary="Technical Support" onPrimary={() => navigate("projects")} onSecondary={() => setModal("contact")} sideImage={productPageHeroImage} />
      <nav className="filter-bar"><strong>Filter by category:</strong>{Object.keys(productGroups).map((item) => <button className={productFilter === item ? "is-active" : ""} key={item} onClick={() => { setProductFilter(item); setShowMoreProducts(false); }}>{item}</button>)}</nav>
      <section className="section"><div className="product-grid approved-product-grid">{visibleProducts.map(([category, title, image, type], index) => <article className={index >= 6 ? "product-card product-card-extra" : "product-card"} key={title}><MediaImage src={image} type={type} /><div><p className="eyebrow muted">{category}</p><h3>{title}</h3><footer><span>{title}</span><button>Specs <ArrowRight size={15} /></button></footer></div></article>)}{filteredProducts.length === 0 && <p className="empty-state">No products match this category yet.</p>}</div>{canExpandProducts && <div className="view-more-row"><button className="button button-outline" onClick={() => setShowMoreProducts((value) => !value)}>{showMoreProducts ? "Show Less Products" : "View More Products"}<ArrowRight size={16} /></button></div>}</section>
      <section className="section section-grey performance-section"><h2>Comparative Performance Matrix</h2><p>Technical benchmarking for procurement and engineering teams.</p><PerformanceMatrix /></section>
      <DarkCta image={productPageHeroImage} title="Ready to Upgrade Your Energy Infrastructure?" copy="Consult with our technical engineers to design a system optimized for your load requirements and location." button="Request Wholesale Quote" secondary="Speak to an Expert" onClick={() => navigate("quote")} onSecondary={() => setModal("contact")} />
    </main>
  );
}

export { ProductsPage };

