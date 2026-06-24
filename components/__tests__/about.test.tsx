import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/About";
import { skills } from "@/content/cv";

describe("About", () => {
  it("renders the About heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2, name: /about/i })).toBeInTheDocument();
  });

  it("renders every skill category", () => {
    render(<About />);
    for (const group of skills) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
    }
  });
});
