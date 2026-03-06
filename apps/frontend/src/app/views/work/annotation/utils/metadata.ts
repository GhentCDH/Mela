import {
  findBodyType,
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { FormValidationDef } from '../store/annotation-def.store';

export const getMetadata = (
  annotation: W3CAnnotation,
  validationDef: FormValidationDef,
) => {
  if (!validationDef) return null;
  const specifiedResource = findBodyType<SpecificResource>(
    'SpecificResource',
    (body) => true,
  )(annotation);

  return specifiedResource.value;
};
