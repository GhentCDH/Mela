import type { Lookup, Edition } from "~/types";
import { useFormKitSchema } from "@sfxcode/formkit-primevue";
const { addElement, addList, addListGroup, addComponent, addListGroupFunctions } = useFormKitSchema()


function addFlexElement(children: any[]) {
  return addElement('div', children, { class: 'min-w-40rem flex gap-4' })
}

function addGroupButtons() {
  const addButtonComponent = (onClick: string = '', label: string = '', icon: string = '', severity: string = '', render: string = 'true', styleClass: string = 'p-button-sm ml-2'): object => {
    return addComponent('Button', { onClick, label, icon, class: styleClass, severity }, render)
  }

  return addElement('div', [
    addButtonComponent('$removeNode($node, $index)', '', 'pi pi-times', 'danger'),
    addButtonComponent('$copyNode($node, $index)', '', 'pi pi-plus'),
    addButtonComponent('$moveNodeUp($node, $index)', '', 'pi pi-arrow-up', 'secondary', '$index != 0'),
    addElement('span', [], { class: 'ml-2 mr-10' }, '$index == 0'),
    addButtonComponent('$moveNodeDown($node, $index)', '', 'pi pi-arrow-down', 'secondary', '$index < $node.value.length -1'),
    addElement('span', [], { class: 'ml-2 mr-10' }, '$index == $node.value.length -1'),
  ], { class: 'pt-4' })
}

export default (
  manuscripts: Ref<Lookup[]>,
  authors: Ref<Lookup[]>,
) => {


  const allFields = [
    {
      $formkit: "primeInputText",
      name: "name",
      label: "Name",
      validation: "required",
    },
    {
      $formkit: "primeInputNumber",
      name: "year",
      label: "Year",
      validation: "min:-10000",
    },
    {
      $formkit: "primeDropdown",
      name: "author",
      label: "Author",
      options: authors,
      dataKey: "id",
      optionLabel: "name",
      display: "chip",
      filter: true,
    },
    {
      $formkit: "primeMultiSelect",
      name: "manuscripts",
      label: "Manuscript(s)",
      options: manuscripts,
      dataKey: "id",
      optionLabel: "name",
      display: "chip",
      filter: true,
    }
  ];
  return allFields;
};
