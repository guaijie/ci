/// <reference types="react-scripts" />

interface CSS {
  escape(value: string): string;
  supports(property: string, value?: string): boolean;
  paintWorklet: Worklet;
}
