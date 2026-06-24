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
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — open project (opens in a new tab)`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border transition duration-300 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="aspect-[16/10] overflow-hidden bg-border/40">
                  <img
                    src={project.cover}
                    alt={`${project.name} project cover`}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <p className="mt-1 text-sm text-muted">{project.client}</p>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
