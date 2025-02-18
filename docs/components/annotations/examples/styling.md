---
pageClass: custom-page--full-width
---

# Custom styling

<script setup>
import { GhentCdhAnnotations, createAnnotationColors,createAnnotationColor } from '@ghentcdh/annotations/vue';
import { findBodyType } from '@ghentcdh/annotations/core';
import { demoAnnotations } from '@demo/data';

const sources1 = [demoAnnotations.source1];
const sources2 = [demoAnnotations.source1, demoAnnotations.source2];
const annotations = demoAnnotations.annotations;

const Colors = {
  title: '#dd7777',
  subtitle: '#FFB74D', 
  paragraph: '#4d88ff',
  phrase: '#CAB2D6',
};
const Colors2 = {
  title: '#8E44AD',
  subtitle: '#3498DB',
  paragraph: '#1ABC9C',
  phrase: '#E74C3C',
};

const ColorMap = createAnnotationColors(Colors);
const ColorMap2 = createAnnotationColors(Colors2);

const mapTarget = (annotation, sourceUri) => {
    const type = findBodyType('TextualBody')(annotation);
    return type?.value === 'paragraph' ? 'gutter' : 'text';
};

const mapColor = (annotation, sourceUri) => {
    const type = findBodyType('TextualBody')(annotation);
    return ColorMap[type?.value] ?? createAnnotationColor('black');
};

const mapColor2 = (annotation, sourceUri) => {
    const type = findBodyType('TextualBody')(annotation);
    const mapper = sourceUri===demoAnnotations.source1.uri?ColorMap:ColorMap2;
    return mapper[type?.value] ?? createAnnotationColor('black');
};


</script>

## Custom color
<GhentCdhAnnotations :sources="sources2" 
                    :cols="sources2.length"
                    :annotations="annotations" 
                    :config="{mapTarget, mapColor}"/>

## Custom colors for each source
<GhentCdhAnnotations :sources="sources2"
    :cols="sources2.length"
    :annotations="annotations"
    :config="{mapTarget, mapColor: mapColor2}"/>