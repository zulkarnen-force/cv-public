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

// jsdom has no window.matchMedia; the Reveal component uses it to detect
// prefers-reduced-motion.
if (!window.matchMedia) {
  // @ts-expect-error assigning a test stub
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
