import { Container } from "@/components/ui/Container";
import { profile } from "@/content/cv";

export function Hero() {
  return (
    <section id="top" className="py-28 sm:py-36">
      <Container>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          {profile.location}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl text-muted sm:text-2xl">{profile.title}</p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
          {profile.tagline}
        </p>
        <div className="mt-10">
          <a
            href={profile.cvPdfPath}
            download
            className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Download CV
          </a>
        </div>
      </Container>
    </section>
  );
}
