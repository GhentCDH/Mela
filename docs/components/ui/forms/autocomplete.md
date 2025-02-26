# Autocomplete

```vue
      <Autocomplete
        v-model="model"
        label="The label"
        :options="options"
      />
```

<script setup>
import { Autocomplete } from "@ghentcdh/ui";
import { ref } from 'vue';

const model = ref(null);
const swapiModel = ref(null);
const options = [{
    value: 1,
    label: "Option 1"
  },
  {
    value: 2,
    label: "Option 2"
  },
  {
    value: 3,
    label: "Option 3"
}];
const modelWithValue = ref(options[0]);
const swapiInitialValue = ref({
  "name": "Darth Vader",
  "url": "https://swapi.dev/api/people/4/"
});

const config = {
    uri: 'https://swapi.dev/api/people/?search=',
    skipAuth: true,
    dataField: 'results'
};

</script>

## Default
<Autocomplete
    v-model="model"
    label="The label"
    :options="options"
/>

<div class="flex gap-2">
    <Autocomplete
        v-model="modelWithValue"
        label="With initial value"
        :options="options"
    />
<pre>
{{modelWithValue}}
</pre>
</div>

## Autocomplete with remote call
<div class="flex gap-2">
<Autocomplete
    v-model="swapiModel"
    label="Enter a starwars character name"
    :config="config"
    :labelKey="'name'"
    :valueKey="'url'"
/>

<pre>{{swapiModel}}</pre>
</div>


<div class="flex gap-2">
<Autocomplete
    v-model="swapiInitialValue"
    label="Initial Value"
    :config="config"
    :labelKey="'name'"
    :valueKey="'url'"
/>

<pre>{{swapiInitialValue}}</pre>
</div>

## Required
<Autocomplete
    v-model="model"
    label="The label"
    :options="options"
    :required="true"
/>

## Select with errors
<Autocomplete
    v-model="model"
    label="The label"
    :options="options"
    errors="Some error"
/>