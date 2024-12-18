<script setup lang="ts">
import { onMounted, ref } from 'vue';

import FormComponent from './form.component.vue';
import { useFormStore } from './form.store';

const properties = defineProps<{
  id: string;
  urlSchema: string;
  createTitle: string;
  updateTitle?: string;
}>();
const valid = ref(false);
const formData = defineModel();

const store = useFormStore(properties.id);
onMounted(() => {
  store.init(properties.urlSchema);
});

const emits = defineEmits(['success']);

const save = () => {
  store.save(formData.value.id, formData.value).then(() => {
    emits('success');
  });
};

const clear = () => {
  formData.value = { id: null };
};

const onValid = (v: boolean) => {
  valid.value = v;
};
</script>

<template>
  <div class="card bg-base-100 w-full shadow border-2">
    <div
      v-if="store.formSchema && store.uiSchema"
      class="card-body"
    >
      <h1 class="card-title">
        {{ formData?.id ? updateTitle : createTitle }}
      </h1>
      <FormComponent
        id="ud"
        v-model="formData"
        :schema="store.formSchema"
        :uischema="store.uiSchema"
        @valid="onValid($event)"
      />
      <div class="card-actions flex justify-end">
        <button
          class="btn btn-outline"
          @click="clear"
        >
          Clear
        </button>
        <button
          :disabled="!valid"
          class="btn btn-primary"
          @click="save"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
