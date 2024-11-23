
// Declare PNG and JPG files as modules (for importing images)
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

// If you have global types, like a global object for storing mood data
declare global {
  interface MoodData {
    moodScale: number; // Scale between 1-5
    description: string; // Mood description
    date: string; // Date of the mood entry
  }

  // Optionally extend the window size or other types if required
  namespace NodeJS {
    interface Global {
      windowSize: { width: number; height: number };
    }
  }
}

// If you use a third-party library with no types, you can declare its module here
// For example, if you're using a custom library without types:
declare module 'some-library-with-no-types' {
  export function someFunction(): void;
}
