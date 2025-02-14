# Select

```vue
      <SelectComponent
        v-model="model"
        label="The label"
        :options="options"
      />
```

<script setup>
import {
SelectComponent
} from "@ghentcdh/ui";
import { ref } from 'vue';

const model = ref(null);
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

</script>

## Default
<SelectComponent
    v-model="model"
    label="The label"
    :options="options"
/>

## Required
<SelectComponent
v-model="model"
label="The label"
:options="options"
:required="true"
/>

## Select with errors
<SelectComponent
v-model="model"
label="The label"
:options="options"
errors="Some error"
/>