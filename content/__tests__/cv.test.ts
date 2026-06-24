import { profile, about, skills, experience, projects, contacts } from "@/content/cv";

describe("cv content", () => {
  it("has the core profile fields", () => {
    expect(profile.name).toBe("Zulkarnen");
    expect(profile.title).toBe("Software Engineer");
    expect(profile.cvPdfPath).toBe("/cv.pdf");
    expect(profile.location).toMatch(/Yogyakarta/);
    expect(profile.tagline.length).toBeGreaterThan(0);
  });

  it("has about paragraphs and skill groups", () => {
    expect(about.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThanOrEqual(8);
    expect(skills.every((g) => g.items.length > 0)).toBe(true);
  });

  it("has three experience roles, newest first", () => {
    expect(experience).toHaveLength(3);
    expect(experience[0].company).toMatch(/Muhammadiyah Software Labs/);
    expect(experience.every((e) => e.bullets.length > 0)).toBe(true);
  });

  it("has the four featured projects", () => {
    expect(projects).toHaveLength(4);
    const names = projects.map((p) => p.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "LPP Agro Marketplace",
        "Heaven Marketplace",
        "SITAMA",
        "KTA Muhammadiyah",
      ]),
    );
  });

  it("has correct contact hrefs", () => {
    const byKind = Object.fromEntries(contacts.map((c) => [c.kind, c.href]));
    expect(byKind.email).toBe("mailto:zulkarnen706@gmail.com");
    expect(byKind.whatsapp).toBe("https://wa.me/6285722382371");
    expect(byKind.linkedin).toBe("https://www.linkedin.com/in/zulkarnen/");
    expect(byKind.github).toBe("https://github.com/zulkarnen-force/");
  });

  it("contains no leftover [TAG] markers", () => {
    const blob = JSON.stringify({ about, skills, experience, projects });
    expect(blob).not.toMatch(/\[(BE|FS|DevOps|ALL)\]/);
  });
});
