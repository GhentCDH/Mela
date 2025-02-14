import { vanillaRenderers } from '@jsonforms/vue-vanilla';

import { arrayRenderers } from './array';
import { controlRenderers } from './controls';
import { layoutRenderers } from './layouts';

export * from './tester';

export const customRenderers = [
  controlRenderers,
  layoutRenderers,
  // ...complexRenderers,
  ...arrayRenderers,
  // ...labelRenderers,
].flat();

const customRenderesName = customRenderers.map((c) => c.renderer.name);
customRenderesName.push('ArrayListRenderer');

const useVanillaRenderers = vanillaRenderers.filter(
  (v) => !customRenderesName.includes(v.renderer.name),
);

export const tailwindRenderers = [
  ...customRenderers,
  ...useVanillaRenderers,
] as const;
