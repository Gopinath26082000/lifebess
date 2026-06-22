import React from "react";
import { Helmet } from "react-helmet-async";
import {
  homeHeroImage,
  logo,
  productBessCabinetImage,
  productHeroImage,
  projectHeroImage,
  residentialRooftopInstallImage,
  serviceHeroImage,
  utilityLandscapeImage
} from "./assets";

const siteUrl = (import.meta.env.VITE_SITE_URL || "https://www.lifebess.com").replace(/\/$/, "");
const siteName = "Life Bess Solar";
const defaultTitle = "Life Bess Solar | Renewable Energy and BESS Solutions";
const defaultDescription =
  "Life Bess Solar delivers residential solar, utility-scale solar, battery energy storage, solar products, and renewable energy project services.";

const routeSeo = {
  home: {
    title: defaultTitle,
    description: defaultDescription,
    path: "/",
    image: homeHeroImage,
    keywords: "solar energy company, battery energy storage, renewable energy solutions, Life Bess Solar"
  },
  about: {
    title: "About Life Bess Solar | Renewable Energy Company",
    description:
      "Learn about Life Bess Solar, a renewable energy company focused on reliable solar power, battery storage, and sustainable energy delivery.",
    path: "/#about",
    image: homeHeroImage,
    keywords: "about Life Bess Solar, renewable energy company, solar power company"
  },
  services: {
    title: "Solar Services | Engineering, Installation and Energy Storage",
    description:
      "Explore solar services from Life Bess Solar including site feasibility, engineering liaison, solar installation, transmission infrastructure, and BESS support.",
    path: "/#services",
    image: serviceHeroImage,
    keywords: "solar installation services, solar engineering, BESS services, energy storage services"
  },
  products: {
    title: "Solar Products | Panels, Inverters, Batteries and Home Kits",
    description:
      "Find solar panels, smart inverters, solar home kits, battery storage products, solar water heaters, street lights, and accessories from Life Bess Solar.",
    path: "/#products",
    image: productHeroImage,
    keywords: "solar panels, solar inverter, battery storage, solar home kit, solar products"
  },
  projects: {
    title: "Solar Projects | Residential, Commercial and Utility Installations",
    description:
      "View Life Bess Solar projects across residential villas, commercial sites, rural estates, industrial BESS, and utility-scale solar deployments.",
    path: "/#projects",
    image: projectHeroImage,
    keywords: "solar projects, utility scale solar, commercial solar projects, residential solar projects"
  },
  residential: {
    title: "Residential Solar | Rooftop Solar and Home Battery Solutions",
    description:
      "Plan a residential solar system with Life Bess Solar, including rooftop installation, solar panels, inverters, and battery-ready home energy solutions.",
    path: "/#residential",
    image: residentialRooftopInstallImage,
    keywords: "residential solar, rooftop solar, home solar panels, solar battery for home"
  },
  utility: {
    title: "Utility-Scale Solar | Large Solar and Energy Storage Projects",
    description:
      "Develop utility-scale solar and battery energy storage projects with Life Bess Solar, from feasibility and engineering coordination to deployment support.",
    path: "/#utility",
    image: utilityLandscapeImage,
    keywords: "utility scale solar, large solar project, BESS project, solar farm development"
  },
  quote: {
    title: "Request a Solar Quote | Life Bess Solar",
    description: "Request a solar quote from Life Bess Solar for residential, commercial, or utility energy needs.",
    path: "/#quote",
    image: productBessCabinetImage,
    noindex: true
  },
  submitted: {
    title: "Request Submitted | Life Bess Solar",
    description: "Your Life Bess Solar request has been submitted.",
    path: "/#submitted",
    image: productBessCabinetImage,
    noindex: true
  }
};

function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function imageUrl(image) {
  if (!image) return absoluteUrl("/assets/lbpl-logo.png");
  return image.startsWith("http") ? image : absoluteUrl(image);
}

function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SolarEnergyCompany",
    name: "Life Bess Solar",
    alternateName: "Life Bess Renewable Energy",
    url: siteUrl,
    logo: imageUrl(logo),
    image: imageUrl(homeHeroImage),
    email: "info@lifebess.com",
    foundingDate: "2024",
    description: defaultDescription,
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential solar installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Utility-scale solar project support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Battery energy storage solutions" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Solar panels and inverters" } }
    ]
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl
  };
}

function Seo({ route }) {
  const meta = routeSeo[route] || routeSeo.home;
  const canonical = absoluteUrl(meta.path);
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl(meta.image)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={imageUrl(meta.image)} />
      <script type="application/ld+json">{JSON.stringify(businessSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema())}</script>
    </Helmet>
  );
}

export { Seo, routeSeo, siteUrl };
