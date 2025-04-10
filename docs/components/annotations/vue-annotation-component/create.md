---
AnnotatedText
---

# AnnotatedText

This is a demo of the standalone `@ghentcdh/vue-component-annotated-text` component.

<script setup>

//
import { ref } from 'vue';
import {
  AnnotatedText,
  Debugger,
  UserActionState,
} from "@ghentcdh/vue-component-annotated-text";
import { demoAnnotations } from '@demo/data';

const lines = [
  {
    // gutter: "1.",
    text: "Χ[αι]ρήμ[ων] Ἀπολλωνίωι τῶι",
    start: 0,
    end: 28,
  },
  {
    gutter: "2.",
    text: "[φι]λτάτωι χαίρειν.",
    start: 32,
    end: 50,
  },
  {
    gutter: "3.",
    text: "καὶ διʼ ἑτ[έρας ἐπι]στολῆς ἔγραψά σοι, ἵνα δύο ",
    start: 54,
    end: 100,
  },
]
const  onMouseDown=(e, payload) =>{
 console.log('mouse Down', e, payload);
}

function onMouseMove(e, payload) {
 console.log('mouse Move', e, payload);
}

const textLines = lines;
// const textLinesParsed = textToLines(demoAnnotations.source1.content.text)
const annotations = ref([]);
</script>

## Create enabled

<AnnotatedText
    key="text"
    :component-id="'1'"
    :annotations="annot"
    :lines="textLines"
    :allow-create="true"
/>
