import { render, screen } from "@testing-library/react";
import { Experience } from "@/components/sections/Experience";
import { experience } from "@/content/cv";

describe("Experience", () => {
  it("renders the Experience heading", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
  });

  it("renders all roles with company and period", () => {
    render(<Experience />);
    for (const role of experience) {
      expect(screen.getByText(role.company)).toBeInTheDocument();
      expect(screen.getByText(role.period)).toBeInTheDocument();
    }
  });

  it("renders the first role's bullets", () => {
    render(<Experience />);
    for (const bullet of experience[0].bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    }
  });
});
