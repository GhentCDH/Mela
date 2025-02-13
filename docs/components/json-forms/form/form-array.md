---
Json form
---

<script setup>
import {
FormComponent
} from "@ghentcdh/json-forms/vue";


import { ref } from 'vue';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/tools/form';


const formData =  new ref({
    name: '123',
    emails: [{ email: '' }, { email: '' }, { email: '' }],
});

const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
    name: { type: 'string' },
    firstname: { type: 'string' },
    age: { type: 'integer' },
    total: { type: 'number' },
    boolean: { type: 'boolean' },
    comment: { type: 'string' },
    autocomplete: { type: 'string' },
    emails: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          email: { type: 'string' },
        },
        required: ['id', 'createdAt', 'email'],
        additionalProperties: false,
      },
    },
  },
  required: ['name'],
  additionalProperties: false,
};

const uischema = LayoutBuilder.vertical()
    .addControls(
        ControlBuilder.properties('name'),
        ControlBuilder.properties('emails').detailFixed(
            LayoutBuilder.horizontal().addControls(
              ControlBuilder.properties('email'),
            ),
      ),
    )
    .build();

const uischemaVariable = LayoutBuilder.vertical()
    .addControls(
        ControlBuilder.properties('name'),
        ControlBuilder.properties('emails').detail(
            LayoutBuilder.horizontal().addControls(
              ControlBuilder.properties('email'),
            ),
      ),
    )
    .build();
</script>

# Array

## Fixed data array
<div>
<FormComponent :schema="schema"
                :uischema="uischema"    
                v-model="formData" />
<pre>{{formData}}</pre>
</div>

## Variable data array
<div>
<FormComponent :schema="schema"
                :uischema="uischemaVariable"    
                v-model="formData" />
<pre>{{formData}}</pre>
</div>