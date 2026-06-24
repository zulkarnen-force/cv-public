import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/cv";

export function Projects() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading id="projects">Projects</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <article className="flex h-full flex-col rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm text-muted">{project.client}</p>
                <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
