export interface RegexExample {
  name: string;
  pattern: string;
  flags: string;
  description: string;
  testText: string;
}

export interface MatchResult {
  match: string;
  index: number;
  groups: Record<string, string> | null;
}
