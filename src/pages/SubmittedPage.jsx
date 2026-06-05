import React, { useEffect } from "react";
import { ArrowRight, Check, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { Footer, JourneyHeader } from "../components/layout";
import { MediaImage } from "../components/ui";
import { productPanelsImage } from "../assets";

function SubmittedPage({ navigate, auditRef }) {
  const reference = auditRef || "LB-2026-4921";

  useEffect(() => {
    const colors = ["#FACC15", "#0B2545", "#134074", "#FFFFFF"];
    
    // Left cannon
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.8 },
      colors: colors
    });
    
    // Right cannon
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.8 },
      colors: colors
    });

    // Center burst with delay
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { x: 0.5, y: 0.5 },
        colors: colors
      });
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="quote-page">
      <JourneyHeader navigate={navigate} />
      <section className="submitted-layout">
        <div className="submitted-media"><MediaImage src={productPanelsImage} type="panels" /><div><CheckCircle2 size={30} /><span><strong>Verified Submission</strong> Audit ID: {reference}</span></div></div>
        <div className="submitted-copy"><p className="eyebrow muted"><ShieldCheck size={20} /> Success Confirmation</p><h1>Thank you for your interest!</h1><p className="lead">Your site audit request has been received.</p><p>Our expert engineer will review your site details and contact you within 24 hours to schedule a virtual assessment.</p><button className="button button-dark" onClick={() => navigate("home")}>Return to Home <ArrowRight size={24} /></button><div className="submitted-meta"><div><Sparkles size={25} /><span>Priority Support</span><strong>Concierge Assigned</strong></div><div><Check size={25} /><span>Next Step</span><strong>Virtual Assessment</strong></div></div></div>
      </section>
      <Footer navigate={navigate} setModal={() => {}} minimal={true} />
    </main>
  );
}

export { SubmittedPage };

