import { render, screen } from "@testing-library/react";
import { Projects } from "@/components/sections/Projects";
import { projects } from "@/content/cv";

describe("Projects", () => {
  it("renders the Projects heading", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { level: 2, name: /projects/i })).toBeInTheDocument();
  });

  it("renders all four project cards with client and a tag", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.name })).toBeInTheDocument();
      expect(screen.getByText(project.client)).toBeInTheDocument();
      // tags[0] ("Next.js") repeats across projects, so assert at least one match
      expect(screen.getAllByText(project.tags[0]).length).toBeGreaterThan(0);
    }
  });
});
