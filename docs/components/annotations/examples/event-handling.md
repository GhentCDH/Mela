---
pageClass: custom-page--full-width
---

# Custom events

<script setup>
import { GhentCdhAnnotations, createAnnotationColors,createAnnotationColor } from '@ghentcdh/annotations/vue';
import { findBodyType } from '@ghentcdh/annotations/core';
import { demoAnnotations } from '@demo/data';
import {ref} from 'vue';

const sources1 = [demoAnnotations.source1];
const sources2 = [demoAnnotations.source1, demoAnnotations.source2];
const annotations = demoAnnotations.annotations;

const Colors = {
  title: '#dd7777',
  subtitle: '#FFB74D', 
  paragraph: '#4d88ff',
  phrase: '#CAB2D6',
};

const ColorMap = createAnnotationColors(Colors);
const source1= demoAnnotations.source1.uri;
const source2= demoAnnotations.source2.uri;

const mapTarget = (annotation, sourceUri) => {
    const type = findBodyType('TextualBody')(annotation);
    return type?.value === 'paragraph' ? 'gutter' : 'text';
};

const mapColor = (annotation, sourceUri) => {
    const type = findBodyType('TextualBody')(annotation);
    return ColorMap[type?.value] ?? createAnnotationColor('black');
};

const eventHandler = (e, payload) => {
console.log(e, payload);
    switch(e){
        case 'click-annotation':
            selectedAnnotations.value = {
                [source1]:[payload.annotationId],
                [source2]: [payload.annotationId]
            };
        break; 
        case 'click-outside':
            selectedAnnotations.value = {
                [source1]:[],
                [source2]: []
            };
        break;
    }

};

const selectedAnnotations = ref({
    [source1]:[],
    [source2]: []
})

</script>

<GhentCdhAnnotations :sources="sources2" 
                    :cols="sources2.length"
                    :annotations="annotations" 
                    :selected-annotations="selectedAnnotations"
                    :config="{mapTarget, mapColor}" 
                    @onEvent="eventHandler" />
