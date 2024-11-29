import type { Lookup } from "~/types";

export default () => {
  return [
    {
      $formkit: "primeInputText",
      name: "name",
      label: "Name",
      validation: "required",
    },
  ];
};
