<template>
  <div class="collapse collapse-arrow bg-base-100 border border-base-300">
    <input
      type="radio"
      name="my-accordion-2"
      :checked="checked"
    >
    <div class="collapse-title font-semibold">
      Transcriptions
    </div>
    <div class="collapse-content text-sm">
      <div class="font-bold">
        Original
      </div>
      {{ sourceText }}
      <div class="font-bold mt-2">
        Translated
      </div>
      {{ translatedText }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import type {
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  findTextualBodyByLanguage
} from '@ghentcdh/annotations/core';


const checked = ref(true);

type Properties = {
  annotation: W3CAnnotation;
  linkedAnnotations: W3CAnnotation[];
};

const properties = defineProps<Properties>();

console.table(properties.linkedAnnotations[0].body);

const findTextualBody = (language: string) => {
  let body = null;

  for (const annotation of properties.linkedAnnotations) {
    body = findTextualBodyByLanguage(language)(annotation);
    if (body) {
      break;
    }
  }

  properties.linkedAnnotations.find(findTextualBodyByLanguage(language));
  if (!body) {
    return '';
  }

  return body.value;
};

const sourceText = computed(() => findTextualBody('Greek'));
const translatedText = computed(() => findTextualBody('English'));
</script>
