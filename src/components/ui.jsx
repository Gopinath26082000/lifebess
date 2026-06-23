import React, { useEffect, useState } from "react";
import { ArrowRight, Building, Check, CheckCircle2, Calendar, Home, MapPin, Play, ShieldCheck, Star, Users, Zap } from "lucide-react";
import { homeHeroImage, productPanelsImage } from "../assets";

function Hero({ className = "", eyebrow, title, copy, primary, secondary, onPrimary, onSecondary, sideImage, bgImage, bgVideo, onStoryClick }) {
  const style = bgImage ? { "--hero-image": `url("${bgImage}")` } : undefined;
  return (
    <section className={`hero ${className}`} style={style}>
      {bgVideo && <video className="hero-bg-video" src={bgVideo} autoPlay muted loop playsInline aria-hidden="true" />}
      <div className="hero-inner">
        {eyebrow && <p className="eyebrow muted">{eyebrow}</p>}
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
        {(primary || secondary) && (
          <div className="hero-actions">
            {primary && <button className="button button-yellow" onClick={onPrimary}>{primary}</button>}
            {secondary && <button className="button button-outline light" onClick={onSecondary}>{secondary}</button>}
          </div>
        )}
      </div>
      {className.includes("hero-home") && <button className="hero-story" type="button" onClick={onStoryClick}><ArrowRight className="story-arrow" size={16} /><Play className="story-play" size={16} fill="currentColor" /> Watch Our Story</button>}
      {className.includes("split-hero") && <MediaImage src={sideImage || productPanelsImage} type="panels" className="hero-side-media" />}
    </section>
  );
}

function Placeholder({ type = "solar", className = "" }) {
  return <MediaImage src={productPanelsImage} type={type} className={className} />;
}

function MediaImage({ src, type = "solar", className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = React.useRef(null);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`media-ph media-img ph-${type} ${loaded ? "is-loaded" : ""} ${className}`.trim()} aria-hidden="true">
      <img ref={imageRef} src={src} alt="" loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
      <span />
    </div>
  );
}

function HomeMetrics() {
  const metrics = [
    [Calendar, "15+", "Years experience"],
    [Zap, "2.5 GW", "Projects delivered"],
    [Building, "100+", "Projects executed"],
    [MapPin, "10+", "States covered"],
    [Users, "50+", "Happy clients"]
  ];
  return (
    <section className="home-metrics" aria-label="Life Bess performance metrics">
      {metrics.map(([Icon, value, label]) => (
        <div className="home-metric" key={label}>
          <Icon size={36} />
          <strong><CountUpText className="metric-number metric-number-home" value={value} /></strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return <div className="section-title">{eyebrow && <p className="eyebrow muted">{eyebrow}</p>}<h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Stat({ value, label, className = "" }) {
  return <div className={`stat ${className}`.trim()}><strong><CountUpText className="metric-number" value={value} /></strong><span>{label}</span></div>;
}

function CountUpText({ value, className = "" }) {
  const sourceValue = String(value);
  const isSimpleMetric = ((sourceValue.match(/(\d[\d,]*(?:\.\d+)?)/g) || []).length === 1);
  const [display, setDisplay] = useState(isSimpleMetric ? sourceValue.replace(/(\d[\d,]*)(?:\.\d+)?/g, "0") : sourceValue);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  useEffect(() => {
    const source = String(value);
    const numericCount = (source.match(/(\d[\d,]*(?:\.\d+)?)/g) || []).length;
    if (numericCount !== 1) {
      setDisplay(source);
      return undefined;
    }
    if (!isIntersecting) {
      setDisplay(source.replace(/(\d[\d,]*)(?:\.\d+)?/g, "0"));
      return undefined;
    }
    const matches = [];
    const regex = /(\d[\d,]*(?:\.\d+)?)/g;
    let match;
    while ((match = regex.exec(source)) !== null) {
      matches.push({ index: match.index, raw: match[0], value: Number(match[0].replace(/,/g, "")), decimals: match[0].includes(".") ? match[0].split(".")[1].length : 0, hasComma: match[0].includes(",") || source.includes("Rs.") });
    }
    if (!matches.length) {
      setDisplay(source);
      return undefined;
    }
    const start = performance.now();
    let frame = 0;
    const format = (number, decimals, hasComma) => {
      const fixed = decimals ? number.toFixed(decimals) : Math.round(number).toString();
      if (!hasComma) return fixed;
      const [whole, decimal] = fixed.split(".");
      return `${Number(whole).toLocaleString("en-IN")}${decimal ? `.${decimal}` : ""}`;
    };
    const animate = (time) => {
      const progress = Math.min((time - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      let result = "";
      let lastIndex = 0;
      for (const item of matches) {
        result += source.slice(lastIndex, item.index);
        result += format(item.value * eased, item.decimals, item.hasComma);
        lastIndex = item.index + item.raw.length;
      }
      result += source.slice(lastIndex);
      setDisplay(result);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, isIntersecting]);

  const gwMatch = String(display).match(/^(.+?)(\s*GW)$/i);
  if (gwMatch) {
    return <span className={className} ref={elementRef}><span className="metric-value-main">{gwMatch[1].trimEnd()}</span><span className="metric-unit-gw"> GW</span></span>;
  }
  return <span className={className} ref={elementRef}>{display}</span>;
}

function SubsidyCard({ onCheck }) {
  const rows = [["1 kW", "₹30,000"], ["2 kW", "₹60,000"], ["3 kW", "₹78,000"]];
  return <div className="subsidy-card"><h3>Subsidy Benefits</h3><div className="subsidy-rows subsidy-rows-approved"><div className="subsidy-heading"><span>Capacity</span><span>Subsidy Amount</span></div>{rows.map(([label, amount], index) => <div className={index === rows.length - 1 ? "is-highlighted" : ""} key={label}><span>{label}</span><strong>{amount}</strong></div>)}</div><button className="button button-dark" onClick={onCheck}>Check Your Eligibility</button></div>;
}

function InfoCard({ icon: Icon, title, copy }) {
  return <article className="info-card"><Icon size={28} /><h3>{title}</h3><p>{copy}</p></article>;
}

function MiniList({ items, dark = false }) {
  return <div className={dark ? "mini-list dark" : "mini-list"}>{items.map((item) => <div key={item}><CheckCircle2 size={18} /><span>{item}</span></div>)}</div>;
}

function Checklist({ items }) {
  return <ul className="checklist">{items.map((item) => <li key={item}><Check size={17} /> <span>{item}</span></li>)}</ul>;
}

function Table({ rows, headings }) {
  return <div className="table-wrap"><table>{headings && <thead><tr>{headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>}<tbody>{rows.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function PerformanceMatrix() {
  const rows = [["Lithium Storage", "> 95%", "10-15 Years", "Low"], ["Solar PV Modules", "21.5% - 23%", "25-30 Years", "Minimal"], ["Hybrid Inverters", "98.4% Max", "10-12 Years", "Digital Monitoring"]];
  return <div className="performance-table"><table><thead><tr><th>Product Category</th><th>Typical Efficiency</th><th>Lifespan</th><th>Maintenance</th></tr></thead><tbody>{rows.map(([category, efficiency, lifespan, maintenance]) => <tr key={category}><td>{category}</td><td>{efficiency}</td><td>{lifespan}</td><td><span className="maintenance-status"><CheckCircle2 size={18} />{maintenance}</span></td></tr>)}</tbody></table></div>;
}

function DarkCta({ title, copy, button, secondary, onClick, onSecondary, withEmail = false, image = homeHeroImage }) {
  const style = image ? { "--cta-image": `url(${image})` } : undefined;
  return <section className="dark-cta" style={style}><div className="dark-cta-copy"><h2>{title}</h2><p>{copy}</p></div>{withEmail ? <form onSubmit={(event) => { event.preventDefault(); onClick(); }}><input placeholder="Corporate / Investor Inquiries" /><button className="button button-yellow">{button} <ArrowRight size={17} /></button></form> : <div className="hero-actions dark-cta-actions"><button className="button button-yellow" onClick={onClick}>{button} <ArrowRight size={17} /></button>{secondary && <button className="button button-outline light" onClick={onSecondary}>{secondary}</button>}</div>}</section>;
}

function PlanCard({ title, price, copy, featured = false }) {
  return <article className={featured ? "plan-card featured" : "plan-card"}><ShieldCheck size={24} /><h3>{title}</h3><strong>{price}</strong><span>Savings per unit</span><p>{copy}</p></article>;
}

function StepCard({ number, title, type, image }) {
  return <article className="step-card"><strong>{number}</strong><h3>{title}</h3><p>Our experts conduct detailed analysis and execute with precision engineering.</p><MediaImage src={image || productPanelsImage} type={type} /></article>;
}

function ImageCard({ title, type, image }) {
  return <article className="image-card"><MediaImage src={image || productPanelsImage} type={type} /><div><h3>{title}</h3><p>Design and deployment support for maximum uptime and long-term performance.</p><button>Technical Specs <ArrowRight size={15} /></button></div></article>;
}

function Testimonial({ name, role }) {
  return (
    <article className="testimonial-card">
      <div className="stars" aria-label="5 star rating">
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
      </div>
      <p>"Life Bess transformed our energy strategy. Their reliability, precision, and executive-level service exceeded our projections."</p>
      <strong>{name}</strong>
      <span>{role}</span>
    </article>
  );
}

function ChoiceCard({ icon: Icon, title, copy, selected = false, onClick }) {
  return <button type="button" className={selected ? "choice-card is-selected" : "choice-card"} onClick={onClick}><Icon size={36} /><strong>{title}</strong><span>{copy}</span></button>;
}

function ProgressDots({ step, label }) {
  return <div className={`progress-dots ${step}`}><span /><span /><span /><strong>{label}</strong></div>;
}

function ProgressBar({ className, label }) {
  return <div className={`progress-bar ${className}`}><span /><strong>{label}</strong></div>;
}

function Timeline({ items, start = 1 }) {
  return <div className="timeline">{items.map((item, index) => <div key={item}><span>{index + start}</span><strong>{item}</strong><p>{index === 0 ? "See your estimated savings, system size, and payback period instantly." : "Our engineer will discuss specific site requirements."}</p></div>)}</div>;
}

function IconLine({ icon: Icon, text }) {
  return <p className="icon-line"><Icon size={26} /> <span>{text}</span></p>;
}

export { Hero, Placeholder, MediaImage, HomeMetrics, SectionTitle, Stat, CountUpText, SubsidyCard, InfoCard, MiniList, Checklist, Table, PerformanceMatrix, DarkCta, PlanCard, StepCard, ImageCard, Testimonial, ChoiceCard, ProgressDots, ProgressBar, Timeline, IconLine };
