<!-- 
In main.ts add the following line to import css for the component:

import '@ghentcdh/vue-component-annotated-text/style.css'
-->

<script setup lang="ts">
import {AnnotatedText, type Line, type Annotation, type AnnotationTarget} from '@ghentcdh/vue-component-annotated-text';

const lines = [ {start: 0,end:10, gutter:"1.", text:"0123456789"},
                {start: 11,end:20, gutter:"2.", text:"abcdefghij"},
                {start: 21,end:30, gutter:"3.", text:"klmnopqrst"},
                {start: 31,end:40, gutter:"4.", text:"uvwxyz1234"},
] as Line[];

const annotations = [ {id: "1",
  start: 1,
  end: 7,
  target: "text" as AnnotationTarget},
  {id: "2",
  start: 2,
  end: 9,
  target: "text" as AnnotationTarget},

] as Annotation[];
</script>

<template>˜
 <div>
  <AnnotatedText
      :lines="lines"
      :annotations="annotations"
    >
  </AnnotatedText>
 </div>
</template>

<style scoped>
</style>
