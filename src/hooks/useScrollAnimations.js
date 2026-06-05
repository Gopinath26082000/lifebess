import { useEffect } from "react";

function useScrollAnimations(route, modal) {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".hero-inner, .hero-side-media, .split-section > div, .media-frame, .section-title, .mosaic-card, .info-card, .product-card, .project-card, .subsidy-benefit-card, .subsidy-trust-strip, .testimonial-card, .quote-card, .quote-side, .reliability-panel, .submitted-media, .submitted-copy, .dark-cta h2, .dark-cta p, .dark-cta form, .center-cta > *, .footer > div"
    );

    targets.forEach((target, index) => {
      if (!target.classList.contains("motion-item")) {
        target.classList.add("motion-item");
      }
      target.classList.remove("motion-left", "motion-right", "motion-up");
      const rect = target.getBoundingClientRect();
      const fromLeft = rect.left < window.innerWidth * 0.45;
      const fromRight = rect.left > window.innerWidth * 0.55;
      target.classList.add(fromLeft ? "motion-left" : fromRight ? "motion-right" : "motion-up");
      target.style.setProperty("--motion-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [route, modal]);
}

export { useScrollAnimations };
