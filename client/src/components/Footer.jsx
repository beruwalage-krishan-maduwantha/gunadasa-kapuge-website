import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__ring">ක</span>
      <p className="footer__memory">
        <em>In loving memory of Gunadasa Kapuge · 1945 — 2003</em>
      </p>
      <nav className="footer__links">
        <Link to="/">මුල් පිටුව</Link>
        <Link to="/biography">චරිතය</Link>
        <Link to="/music">ගීත</Link>
        <Link to="/concerts">ප්‍රසංග</Link>
        <Link to="/gallery">ගැලරිය</Link>
        <Link to="/contact">සම්බන්ධතා</Link>
      </nav>
      <hr />
      <p className="footer__copy">
        © 2026 GUNADASA KAPUGE TRIBUTE · MADE WITH RESPECT IN SRI LANKA
      </p>
    </footer>
  );
}
