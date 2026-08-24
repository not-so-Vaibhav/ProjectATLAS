import type { LucideIcon } from "lucide-react";

export type BuilderIdentity =
  | "arrival"
  | "engineering"
  | "founder"
  | "designer"
  | "ai"
  | "photography"
  | "journal"
  | "lab"
  | "future"
  | "contact"
  | "my-work";

export type IdentityChapter = {
  id: BuilderIdentity;
  label: string;
  path: string;
  question: string;
  headline: string;
  summary: string;
  environment: string;
  builderOutfit: string;
  builderEquipment: string[];
  builderBehavior: string;
  atmosphere: string;
  accent: "wood" | "green" | "gold" | "glass" | "blue";
  visibleInPrimaryNavigation: boolean;
  nextId?: BuilderIdentity;
  zones: Array<{
    title: string;
    purpose: string;
    details: string[];
  }>;
};

export type NavigationItem = Pick<
  IdentityChapter,
  "id" | "label" | "path" | "visibleInPrimaryNavigation"
> & {
  icon: LucideIcon;
};
