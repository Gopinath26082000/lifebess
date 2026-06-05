export const navItems = [
  { route: "home", label: "Home" },
  { route: "about", label: "About" },
  { route: "services", label: "Services" },
  { route: "products", label: "Products" },
  { route: "projects", label: "Projects" }
];

export const routeSet = new Set([
  "home",
  "about",
  "services",
  "products",
  "projects",
  "residential",
  "utility",
  "quote",
  "submitted"
]);

export const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "info@lifebess.com";
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID";
export const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "YOUR_CONTACT_TEMPLATE_ID";
export const EMAILJS_QUOTE_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID || "YOUR_QUOTE_TEMPLATE_ID";
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY";
export const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";
