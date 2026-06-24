import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back home
        </a>
      </Container>
    </main>
  );
}
