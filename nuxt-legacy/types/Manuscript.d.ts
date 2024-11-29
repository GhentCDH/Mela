import type { Optional } from "Optional";
import type { Edition } from "~/types";

export type Manuscript = {
  name: string;
  editions: Edition[];
  author: Author;
};

export type ManuscriptCreate = Optional<Manuscript, "id">;
