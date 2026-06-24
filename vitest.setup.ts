import "@testing-library/jest-dom/vitest";

// jsdom has no IntersectionObserver; the Reveal component uses it in useEffect.
if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error assigning a test stub
  globalThis.IntersectionObserver = IntersectionObserverStub;
}
