import type { Optional } from "Optional";

import type { Edition } from "~/types";

export type Phrase = {
  id: number;
  external_identifier: string;
  mela_identifier: string;
  order: number;
  content: string;
  translation: string;
  edition: Edition;
};

export type PhraseCreate = Optional<Phrase, "id">;
