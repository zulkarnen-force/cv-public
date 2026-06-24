export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border px-3 py-1 text-sm text-foreground">
      {children}
    </span>
  );
}
