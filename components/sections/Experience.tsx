import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/content/cv";

export function Experience() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading id="experience">Experience</SectionHeading>
        <ol className="relative border-l border-border">
          {experience.map((role) => (
            <li key={`${role.company}-${role.period}`} className="mb-12 ml-6 last:mb-0">
              <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-foreground" />
              <Reveal>
                <h3 className="text-lg font-semibold">{role.title}</h3>
                <p className="text-foreground">{role.company}</p>
                <p className="mt-1 text-sm text-muted">
                  <span>{role.period}</span> · <span>{role.location}</span>
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
                  {role.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
