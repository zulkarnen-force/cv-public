import { render, screen } from "@testing-library/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

describe("ui primitives", () => {
  it("Container renders children", () => {
    render(<Container>hello</Container>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("SectionHeading renders an h2", () => {
    render(<SectionHeading id="about">About</SectionHeading>);
    const heading = screen.getByRole("heading", { level: 2, name: "About" });
    expect(heading).toBeInTheDocument();
  });

  it("Tag renders its label", () => {
    render(<Tag>Next.js</Tag>);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});
