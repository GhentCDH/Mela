import {
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';
import type { Annotation } from '@ghentcdh/mela/generated/types';

import { findTextValue } from './translation';
import type { AnnotationType } from '../../identify.color';

const treeOrder = {
  paragraph: ['title', 'subtitle', 'phrase'],
  title: ['example'],
  subtitle: ['example'],
  phrase: ['example'],
  example: ['lemma'],
};

export type TreeProp = {
  id: string;
  type: AnnotationType;
  start: number;
  end: number;
  content: string;
  children: TreeProp[];
};

const isInRange = (value1: TreeProp, value2: TreeProp) => {
  if (!value1 || !value2) return false;
  return (
    (value1.start >= value2.start && value1.start <= value2.end) ||
    (value1.end >= value2.start && value1.end <= value2.end)
  );
};

const createChildren = (property: TreeProp) => {
  if (property.children.length === 0) return property;

  const render = treeOrder[property.type];
  const rest = [];
  const children = [];
  property.children.forEach((child) => {
    if (render.includes(child.type)) {
      children.push(child);
    } else rest.push(child);
  });

  rest.forEach((child) => {
    const found = children.find((c) => isInRange(child, c));
    if (found) {
      found.children.push(child);
    } else {
      property.children.push(child);
    }
  });

  children.forEach((child) => createChildren(child));

  return { ...property, children };
};

export const createAnnotationTree = (
  sourceId: string,
  annotations: Annotation[],
) => {
  const result: TreeProp[] = [];
  const rest: TreeProp[] = [];

  annotations?.map((annotation) => {
    const purpose: AnnotationType = findTagging(annotation)
      ?.value as AnnotationType;

    if (!purpose) return;

    const selector = findTextPositionSelector(sourceId)(annotation);
    if (!selector) return;

    const text = findTextValue(annotation);
    const property: TreeProp = {
      id: annotation.id,
      type: purpose,
      start: selector.selector.start,
      end: selector.selector.end,
      content: text?.value,
      children: [],
    };
    if (purpose === 'paragraph') {
      result.push(property);
    } else {
      rest.push(property);
    }
  });

  result.sort((a, b) => a.start - b.start);
  rest.sort((a, b) => a.start - b.start);

  let activeIndex = 0;
  let activeResult = result[activeIndex];
  const NONE_INDEX = 'NONE';
  rest.forEach((item) => {
    if (!isInRange(item, activeResult)) {
      activeIndex += 1;
      if (activeIndex < result.length) activeResult = result[activeIndex];
      else {
        activeResult = {
          id: NONE_INDEX,
          start: activeResult?.end + 1,
          end: Infinity,
          type: 'paragraph',
          content: 'DUMMY',
          children: [],
        };
      }
    }
    activeResult.children.push(item);
  });

  if (activeResult?.id === NONE_INDEX) {
    activeResult = createChildren(activeResult);
  } else {
    activeResult = { children: [] } as TreeProp;
  }

  const annotatonTree = [
    result.map((r) => createChildren(r)),
    activeResult.children,
  ].flat();

  return annotatonTree;
};
