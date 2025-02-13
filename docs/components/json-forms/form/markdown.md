---
Markdown input
---

<script setup>
import {
FormComponent
} from "@ghentcdh/json-forms/vue";
import { ref } from 'vue';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms/core';

const uischema = LayoutBuilder.vertical()
    .addControls(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('stringControl').markdown(),
      ),
    )
    .build();

const formData =  new ref({
    stringControl: `Example text **Bold**
Example text *italic*
Example text ~~strikethrough~~

 some more text`,
  });

const schema =  {
    type: 'object',
    properties: {
      // examples
      stringControl: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['stringControl'],
  }

</script>

# Markdown input

<div>
<FormComponent :schema="schema"
                :uischema="uischema"    
                v-model="formData" />
<pre>{{formData}}</pre>
</div>