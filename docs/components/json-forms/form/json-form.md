---
Json form
---

<script setup>
import {
FormComponent
} from "@ghentcdh/json-forms/vue";


import { ref } from 'vue';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/json-forms/core';


const formData =  new ref({});

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
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('name'),
        ControlBuilder.properties('firstname'),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('age').width('xs'),
        ControlBuilder.properties('total'),
        ControlBuilder.properties('boolean'),
      ),
      LayoutBuilder.horizontal()
        .addControls
        // ControlBuilder.properties('comment').textArea(),
        (),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('autocomplete').autocomplete({}),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('emails').detail(
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.properties('email'),
          ),
        ),
      ),
    )
    .build()

</script>

# Json form input

<div>
<FormComponent :schema="schema"
                :uischema="uischema"    
                v-model="formData" />
<pre>{{formData}}</pre>
</div>