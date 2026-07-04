import Image from "next/image";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className="site-nav">
      <a className="brand-link" href="#top" aria-label="NightSync Studio, home">
        <Image src="/night-sync-cat.svg" alt="" width={48} height={36} priority />
        <span>NightSync Studio</span>
      </a>
      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
