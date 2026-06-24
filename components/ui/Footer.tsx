import { Container } from "@/components/ui/Container";
import { profile } from "@/content/cv";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </Container>
    </footer>
  );
}
