import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the name and Software Engineer title", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /Zulkarnen/ })).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  it("has a Download CV link pointing at the PDF", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /download cv/i });
    expect(cta).toHaveAttribute("href", "/cv.pdf");
  });
});
