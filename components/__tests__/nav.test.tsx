import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

describe("Nav", () => {
  it("renders anchor links to each section", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
  });
});

describe("Footer", () => {
  it("renders the name and current year", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
    expect(screen.getByText(/Zulkarnen/)).toBeInTheDocument();
  });
});
