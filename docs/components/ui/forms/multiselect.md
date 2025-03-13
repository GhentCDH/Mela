# MultiSelect

```vue
      <MultiSelect
        v-model="model"
        label="The label"
        :options="options"
      />
```

<script setup>import {MultiSelect} from '@ghentcdh/ui';
import {ref} from 'vue';

const comp = MultiSelect;
const model = ref(null);
const options = [{
    value: 1,
    label: 'Option 1'
  },
  {
    value: 2,
    label: 'Option 2'
  },
  {
    value: 3,
    label: 'Option 3'
}];

</script>

## Default
<MultiSelect
v-model="model"
label="The label"
:options="options"
/>

## Required
<MultiSelect
v-model="model"
label="The label"
:options="options"
:required="true"
/>

## Select with errors
<MultiSelect
v-model="model"
label="The label"
:options="options"
errors="Some error"
/>