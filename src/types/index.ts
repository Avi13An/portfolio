export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  timeline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  accentColor: "emerald" | "cyan" | "violet" | "amber";
}

export interface ProcessStep {
  step: string;
  days: string;
  title: string;
  summary: string;
  details: string[];
  deliverable: string;
}

export interface ArchitectureHighlight {
  id: string;
  title: string;
  tag: string;
  metric: string;
  description: string;
  deepDive: string;
  codeSnippet?: string;
}
