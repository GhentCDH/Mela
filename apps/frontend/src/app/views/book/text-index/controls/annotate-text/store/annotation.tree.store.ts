import { defineStore } from 'pinia';
import { computed } from 'vue';

import type { SourceModel } from '@ghentcdh/annotations/core';
import type { W3CAnnotation } from '@ghentcdh/vue-component-annotated-text';

import { useAnnotationStore } from './annotation.store';
import { AnnotationTree } from '../utils/tree';

class AnnotationTrees {
  private readonly annotationTreeMap: Map<string, AnnotationTree>;

  constructor(annotations: W3CAnnotation[], sources: SourceModel[]) {
    this.annotationTreeMap = new Map<string, AnnotationTree>();
    sources.forEach((source) => {
      this.annotationTreeMap.set(
        source.uri,
        new AnnotationTree(source.uri, annotations),
      );
    });
  }

  getTree(sourceId: string) {
    return this.annotationTreeMap.get(sourceId)?.tree ?? [];
  }

  getParent(source: SourceModel, annotation: W3CAnnotation) {
    return (
      this.annotationTreeMap.get(source.uri)?.getTreeElement(annotation.id)
        ?.parent ?? null
    );
  }
}

export const useAnnotationTreeStore = (id: string) =>
  defineStore('annotationTreeStore', () => {
    const annotationStore = useAnnotationStore(id);

    const annotationTreesMap = computed(() => {
      const annotationTreeMap = new Map<string, AnnotationTree>();
      const sources = annotationStore.sources;
      const annotations = annotationStore.allAnnotations;
      sources.forEach((source) => {
        annotationTreeMap.set(source.uri, new AnnotationTree(source.uri, []));
      });
      return new AnnotationTrees(annotations, sources);
    });

    const filteredAnnotationTreeMap = computed(() => {
      const annotationTreeMap = new Map<string, AnnotationTree>();
      const sources = annotationStore.sources;
      const annotations = annotationStore.annotations;
      sources.forEach((source) => {
        annotationTreeMap.set(source.uri, new AnnotationTree(source.uri, []));
      });
      return new AnnotationTrees(annotations, sources);
    });

    const trees = computed(() => {
      const sources = annotationStore.sources;

      return sources.map((source) => {
        return {
          source: source,
          tree: filteredAnnotationTreeMap.value.getTree(source.uri),
        };
      });
    });

    const getParent = (source: SourceModel, annotation: W3CAnnotation) => {
      const parent = annotationTreesMap.value.getParent(source, annotation);

      if (!parent) return null;
      return annotationStore.getAnnotation(parent?.id);
    };

    return { trees, getParent };
  })();
