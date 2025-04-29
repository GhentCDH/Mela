---
pageClass: custom-page--full-width
---

# Simple example

<script setup lang="ts">
//
import { GhentCdhAnnotations } from '@ghentcdh/annotations/vue';
import {demoAnnotations} from '@demo/data';

const sources1 = [demoAnnotations.source1];
const sources2 = [demoAnnotations.source1, demoAnnotations.source2];
const annotations = [demoAnnotations.annotations[0]];

// Don't remove is only used to keep imports on formatting
const _dummy_for_imports = [GhentCdhAnnotations];

</script>

## One source text
<GhentCdhAnnotations 
    :sources="sources1" 
    :cols="sources1.length"
    :annotations="annotations" />

## Two source texts
<GhentCdhAnnotations :sources="sources2" 
                    :cols="sources2.length"
                    :annotations="annotations" />
