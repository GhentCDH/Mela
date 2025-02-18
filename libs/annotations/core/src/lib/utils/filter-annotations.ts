import type { W3CAnnotation } from '../model';
import { hasSourceInTargets } from './target.utils';

export const filterAnnotations = (sourceUri: string) => {
  return (annotations: W3CAnnotation[]) =>
    annotations.filter(hasSourceInTargets(sourceUri));
};
