import type { Optional } from "Optional";

import type { Edition } from "~/types";

export type Author = {
  id: number;
  name: string;
  editions: Edition[];
};

export type AuthorCreate = Optional<Author, "id">;
