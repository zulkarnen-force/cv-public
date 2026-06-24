import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the Contact heading", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 2, name: /contact/i })).toBeInTheDocument();
  });

  it("renders each contact link with the correct href", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:zulkarnen706@gmail.com",
    );
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      "https://wa.me/6285722382371",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/zulkarnen/",
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/zulkarnen-force/",
    );
  });
});
