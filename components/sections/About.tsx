import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/Reveal";
import { about, skills } from "@/content/cv";

export function About() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading id="about">About</SectionHeading>
          <div className="space-y-4 text-base leading-relaxed text-foreground sm:text-lg">
            {about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 space-y-6">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
