import { entry as booleanControlRendererEntry } from './BooleanControlRenderer.vue';
import { entry as integerControlRendererEntry } from './IntegerControlRenderer.vue';
import { entry as markdownControlRenderer } from './MarkdownControlRenderer.vue';
import { entry as numberControlRendererEntry } from './NumberControlRenderer.vue';
import { entry as stringControlRendererEntry } from './StringControlRenderer.vue';
import { entry as textAreaControlRenderer } from './TextAreaControlRenderer.vue';
import { entry as autocompleteControlRenderer } from './autocomplete/AutocompleteControlRenderer.vue';
// import { entry as multiStringControlRendererEntry } from './MultiStringControlRenderer.vue';
// import { entry as enumControlRendererEntry } from './EnumControlRenderer.vue';
// import { entry as oneOfEnumControlRendererEntry } from './EnumOneOfControlRenderer.vue';
// import { entry as dateControlRendererEntry } from './DateControlRenderer.vue';
// import { entry as dateTimeControlRendererEntry } from './DateTimeControlRenderer.vue';
// import { entry as timeControlRendererEntry } from './TimeControlRenderer.vue';

export { default as AutocompleteControlRenderer } from './autocomplete/AutocompleteControlRenderer.vue';

export { default as StringControlRenderer } from './StringControlRenderer.vue';
// export { default as MultiStringControlRenderer } from './MultiStringControlRenderer.vue';
export { default as NumberControlRenderer } from './NumberControlRenderer.vue';
export { default as IntegerControlRenderer } from './IntegerControlRenderer.vue';
// export { default as EnumControlRenderer } from './EnumControlRenderer.vue';
// export { default as oneOfEnumControlRenderer } from './EnumOneOfControlRenderer.vue';
// export { default as DateControlRenderer } from './DateControlRenderer.vue';
// export { default as DateTimeControlRenderer } from './DateTimeControlRenderer.vue';
// export { default as TimeControlRenderer } from './TimeControlRenderer.vue';
export { default as BooleanControlRenderer } from './BooleanControlRenderer.vue';
export { default as markdownControlRenderer } from './MarkdownControlRenderer.vue';

export const controlRenderers = [
  // First custom renderers on format
  markdownControlRenderer,
  autocompleteControlRenderer,
  textAreaControlRenderer,
  // multiStringControlRendererEntry,
  // enumControlRendererEntry,
  // oneOfEnumControlRendererEntry,
  // dateControlRendererEntry,
  // dateTimeControlRendererEntry,
  // timeControlRendererEntry,
  booleanControlRendererEntry,

  // Renderers based on type if no format is provided
  stringControlRendererEntry,
  numberControlRendererEntry,
  integerControlRendererEntry,
] as const;
