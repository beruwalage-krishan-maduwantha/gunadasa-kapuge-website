import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const LINKS = [
  { to: "/", si: "මුල් පිටුව", en: "HOME" },
  { to: "/biography", si: "චරිතය", en: "BIOGRAPHY" },
  { to: "/music", si: "ගීත", en: "MUSIC" },
  { to: "/concerts", si: "ප්‍රසංග", en: "CONCERTS" },
  { to: "/gallery", si: "ගැලරිය", en: "GALLERY" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="nav__logo" to="/" onClick={() => setOpen(false)}>
        <span className="nav__ring">ක</span>
        <span className="nav__word">
          <span className="nav__word-si">කපුගේ</span>
          <span className="nav__word-en">GUNADASA KAPUGE</span>
        </span>
      </Link>

      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
            <span className="si">{l.si}</span>
            <span className="en">{l.en}</span>
          </NavLink>
        ))}
        <Link className="nav__cta" to="/contact" onClick={() => setOpen(false)}>
          සම්බන්ධ වන්න
        </Link>
      </nav>

      <button
        className={`nav__burger ${open ? "is-open" : ""}`}
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  );
}
