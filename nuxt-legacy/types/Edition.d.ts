import type { Optional } from "Optional";

import type { Manuscript, Phrase } from "~/types";

export type Edition = {
  id: number;
  name: string;
  year: number;
  manuscripts: Manuscript[];
  phrases: Phrase[];
};

export type EditionCreate = Optional<Edition, "id">;
