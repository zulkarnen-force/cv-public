import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders all five sections", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /Zulkarnen/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /contact/i })).toBeInTheDocument();
  });
});
