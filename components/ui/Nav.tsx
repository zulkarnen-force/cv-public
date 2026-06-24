import { Container } from "@/components/ui/Container";
import { profile } from "@/content/cv";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a className="transition-colors hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
