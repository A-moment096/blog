import type { ComponentType } from "react";

type IslandProps = Record<string, unknown>;
type IslandModule = {
  default?: ComponentType<IslandProps>;
} & Record<string, unknown>;

export const modules = import.meta.glob<IslandModule>("./components/**/*.tsx");