import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { contacts } from "@/content/cv";

export function Contact() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading id="contact">Contact</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Open to backend, full-stack, and platform roles. The quickest ways to reach me:
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {contacts.map((contact) => {
              const isExternal = contact.kind !== "email";
              return (
                <li key={contact.kind}>
                  <a
                    href={contact.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    {contact.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
