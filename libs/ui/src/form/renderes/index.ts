import { vanillaRenderers } from '@jsonforms/vue-vanilla';

import { controlRenderers } from './controls';
import { layoutRenderers } from './layouts';

export const customRenderers = [
  controlRenderers,
  layoutRenderers,
  // ...complexRenderers,
  // ...arrayRenderers,
  // ...labelRenderers,
].flat();

const customRenderesName = customRenderers.map((c) => c.renderer.name);

const useVanillaRenderers = vanillaRenderers.filter(
  (v) => !customRenderesName.includes(v.renderer.name),
);

export const tailwindRenderers = [customRenderers, useVanillaRenderers].flat();
