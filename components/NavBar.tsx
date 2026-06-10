import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fm-nav" role="navigation" aria-label="Main navigation">
      <Link href="/" className="fm-nav-logo" aria-label="FM Lab home">
        FM<span className="fm-nav-logo-accent">LAB</span>
      </Link>
      <span className="fm-nav-product">FM26 Coach Calculator</span>
      <div className="fm-nav-links">
        <a href="#how" className="fm-nav-link">How to use</a>
        <a href="#faq" className="fm-nav-link">FAQ</a>
      </div>
    </nav>
  );
}
