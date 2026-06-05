import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { routeSet } from "./config";
import { Header, Footer } from "./components/layout";
import { ContactModal, ContactSuccessModal, EligibilityCalculatorModal, EligibilityResultsDynamicModal } from "./components/modals";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import { makeReference, submitLead } from "./utils/leads";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ResidentialPage } from "./pages/ResidentialPage";
import { UtilityPage } from "./pages/UtilityPage";
import { QuotePage } from "./pages/QuotePage";
import { SubmittedPage } from "./pages/SubmittedPage";

function getRoute() {
  const route = window.location.hash.replace("#", "");
  return routeSet.has(route) ? route : "home";
}

function App() {
  const [route, setRouteState] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [quoteStep, setQuoteStep] = useState(1);
  const [contactRef, setContactRef] = useState("");
  const [auditRef, setAuditRef] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState(null);
  useScrollAnimations(route, modal);

  useEffect(() => {
    const onHashChange = () => setRouteState(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setModal(null);
    if (route === "quote") setQuoteStep(1);
    window.scrollTo({ top: 0 });
  }, [route]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", menuOpen);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [menuOpen]);

  const navigate = (next) => {
    setModal(null);
    window.location.hash = next;
    setRouteState(next);
  };

  const shared = { navigate, setModal };
  const page = useMemo(() => {
    if (route === "about") return <AboutPage {...shared} />;
    if (route === "services") return <ServicesPage {...shared} />;
    if (route === "products") return <ProductsPage {...shared} />;
    if (route === "projects") return <ProjectsPage {...shared} />;
    if (route === "residential") return <ResidentialPage {...shared} />;
    if (route === "utility") return <UtilityPage {...shared} />;
    if (route === "quote") return <QuotePage step={quoteStep} setStep={setQuoteStep} navigate={navigate} setAuditRef={setAuditRef} />;
    if (route === "submitted") return <SubmittedPage navigate={navigate} auditRef={auditRef} />;
    return <HomePage {...shared} />;
  }, [route, quoteStep]);

  const quoteShell = route === "quote" || route === "submitted";

  return (
    <>
      {!quoteShell && (
        <Header
          route={route}
          navigate={navigate}
          setModal={setModal}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
      {page}
      {!quoteShell && <Footer navigate={navigate} setModal={setModal} />}
      {modal === "contact" && <ContactModal onClose={() => setModal(null)} onSuccess={async (form) => {
        const reference = makeReference("LB");
        await submitLead({ type: "Contact Inquiry", reference, data: form });
        setContactRef(reference);
        setModal("contact-success");
      }} />}
      {modal === "contact-success" && <ContactSuccessModal reference={contactRef} onClose={() => setModal(null)} />}
      {modal === "eligibility" && <EligibilityCalculatorModal onClose={() => setModal(null)} onSuccess={(result) => { setEligibilityResult(result); setModal("eligibility-results"); }} />}
      {modal === "eligibility-results" && <EligibilityResultsDynamicModal result={eligibilityResult} onClose={() => setModal(null)} navigate={navigate} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);

