---
pageClass: custom-page--full-width
---

# Snappers 

A few snappers are built in, you can create your own as needed

<script setup>

//
import { ref } from 'vue';
import { pick } from 'lodash-es';
import { GhentCdhAnnotations, createAnnotationColors, createAnnotationColor, useWordSnapper} from '@ghentcdh/annotations/vue';
import { findBodyType } from '@ghentcdh/annotations/core';
import { createTextSelectionAnnotation } from '@ghentcdh/annotations/core';
import { demoAnnotations } from '@demo/data';

const sources1 = [ 
    demoAnnotations.source1,
];
const annotations = ref(demoAnnotations.annotations);
// Don't remove is only used to keep imports on formatting
const _dummy_for_imports = [GhentCdhAnnotations,useWordSnapper];

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


const mapTarget = (annotation, sourceUri) => {
    return 'text';
};

const mapColor = (annotation, sourceUri) => {
    return  createAnnotationColor('#8E44AD');
};

const annotationActions = {
    [demoAnnotations.source1.uri]: { edit: true, create: true},
    [demoAnnotations.oneLine.uri]: { edit: true, create: true}
}

const selectedText = ref([])
const text = demoAnnotations.source1.content.text;
const eventHandler = (e, payload) => {
console.log(e, payload);
    switch(e){
        case 'create--end':
          const annotation = (
            payload.payload
          ).getAnnotation();
          const newAnnotation = createTextSelectionAnnotation(
                demoAnnotations.source1,
                pick(annotation, ['start', 'end']),
                'paragraph',
              );
console.log(newAnnotation);
            annotations.value.push(newAnnotation)
            annotations.value = annotations.value 
            const selection = `${annotation.start}-${annotation.end}: ${text.substring(annotation.start, annotation.end)}`;
            selectedText.value.push(selection);
            selectedText.value = selectedText.value
      break;
    }

};
</script>

## Wordsnapper
<GhentCdhAnnotations :sources="sources1" 
                    :cols="sources1.length"
                    :annotations="annotations" 
                    :annotationActions="annotationActions"
                    :config="{mapTarget, mapColor}"
                    :use-snapper="useWordSnapper"
                    @onEvent="eventHandler"/>

<ul>
    <li v-for="text in selectedText">{{text}}</li>
</ul>