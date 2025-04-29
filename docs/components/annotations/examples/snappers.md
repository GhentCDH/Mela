---
pageClass: custom-page--full-width
---

# Snappers 

A few snappers are built in, you can create your own as needed or adjust an existing one

<script setup>

//
import { ref } from 'vue';
import { pick } from 'lodash-es';
import { GhentCdhAnnotations, createAnnotationColors, createAnnotationColor, useWordSnapper} from '@ghentcdh/annotations/vue';
import { findBodyType } from '@ghentcdh/annotations/core';
import { createTextSelectionAnnotation, updateTextSelectionAnnotation } from '@ghentcdh/annotations/core';
import { demoAnnotations } from '@demo/data';

const sources1 = [ 
    demoAnnotations.source1,
];
const annotations = ref([demoAnnotations.annotations[0]]);
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
    switch(e){
        case 'create--end':
          const annotation = payload.payload.getAnnotation();
          const newAnnotation = createTextSelectionAnnotation(
                demoAnnotations.source1,
                pick(annotation, ['start', 'end']),
                'paragraph',
              );
            annotations.value.push(newAnnotation)
            annotations.value = annotations.value 
            const selection = `${annotation.start}-${annotation.end}: ${text.substring(annotation.start, annotation.end)}`;
            selectedText.value.push(selection);
            selectedText.value = selectedText.value
        break;
        case 'update--end':
              const annotation1 = payload.payload.getAnnotation();

            let existingAnnotation = annotations.value.find(a => a.id === annotation1.id);
            existingAnnotation = updateTextSelectionAnnotation(
                existingAnnotation,
                demoAnnotations.source1,
                pick(annotation1, ['start', 'end']),
            );
            annotations.value = annotations.value.map(a => a.id === existingAnnotation.id ? existingAnnotation : a);
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

<div class="mt-2 pt-2 cborder-t-1 dark:border-gray-200">
<u>Selected text:</u>
<ul>
    <li v-for="text in selectedText">{{text}}</li>
</ul>
</div>