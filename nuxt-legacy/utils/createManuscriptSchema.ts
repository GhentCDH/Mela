import type { Lookup } from "~/types";

export default (texts: Ref<Lookup[] | null>) => {
  return [
    {
      $formkit: "primeInputText",
      name: "name",
      label: "Name",
      validation: "required",
    },
    {
      $formkit: "primeMultiSelect",
      name: "editions",
      label: "Edition(s)",
      options: texts,
      dataKey: "id",
      optionLabel: "name",
      display: "chip",
      filter: false,
    },

    ];
};
