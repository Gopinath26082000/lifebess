import React from "react";
import { ArrowRight, X } from "lucide-react";
import { navItems } from "../config";
import { footerLogo, logo } from "../assets";

function Header({ route, navigate, setModal, menuOpen, setMenuOpen }) {
  const activeRoute = route === "residential" || route === "utility" ? "home" : route;
  const handleNavigate = (next) => {
    setMenuOpen(false);
    navigate(next);
  };
  const handleContact = () => {
    setMenuOpen(false);
    setModal("contact");
  };

  return (
    <header className={menuOpen ? "site-header is-menu-open" : "site-header"}>
      <button className="logo-button" onClick={() => handleNavigate("home")} aria-label="Life Bess home"><img src={logo} alt="Life Bess" /></button>
      <nav className={menuOpen ? "site-nav is-open" : "site-nav"} id="site-navigation">
        <span className="mobile-nav-kicker">Navigation</span>
        {navItems.map((item) => <button className={activeRoute === item.route ? "is-active" : ""} key={item.route} onClick={() => handleNavigate(item.route)}><span className="nav-label">{item.label}</span></button>)}
        <button className="button button-dark mobile-nav-cta" onClick={handleContact}>Contact Us</button>
      </nav>
      <div className="header-actions">
        <button className={`icon-button menu-button ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="site-navigation"><span></span><span></span><span></span></button>
        <button className="button button-dark header-contact" onClick={() => setModal("contact")}>Contact Us</button>
      </div>
    </header>
  );
}

function Footer({ navigate, setModal, minimal }) {
  if (minimal) {
    return (
      <footer className="footer minimal">
        <p className="footer-copy">© 2024 Life Bess Renewable Energy. All rights reserved.</p>
        <div className="footer-links">
          <button type="button" onClick={() => navigate("privacy")}>Privacy Policy</button>
          <button type="button" onClick={() => navigate("terms")}>Terms of Service</button>
        </div>
      </footer>
    );
  }
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={footerLogo} alt="Life Bess" />
        <p>Providing sustainable, reliable, and innovative energy solutions for a brighter, secure tomorrow since 2024.</p>
        <div className="footer-socials" aria-label="Social links"><button type="button">in</button><button type="button">f</button><button type="button">yt</button></div>
        <p className="footer-copy">© 2024 Life Bess Renewable Energy. All rights reserved.</p>
      </div>
      <div><h4>Quick Links</h4><button type="button">Privacy Policy</button><button type="button">Terms of Service</button></div>
      <div><h4>Resources</h4><button type="button">Sustainability Report</button><button type="button" onClick={() => setModal("contact")}>Contact Us</button></div>
      <div><h4>Get In Touch</h4><form onSubmit={(event) => event.preventDefault()}><input placeholder="Email address" /><button type="submit" aria-label="Subscribe"><ArrowRight size={22} /></button></form></div>
    </footer>
  );
}

function JourneyHeader({ navigate }) {
  return <header className="journey-header"><button className="logo-button" onClick={() => navigate("home")} aria-label="Life Bess home"><img src={logo} alt="Life Bess" /></button><button className="exit-button" onClick={() => navigate("home")}><X size={22} /> Exit Journey</button></header>;
}

export { Header, Footer, JourneyHeader };

