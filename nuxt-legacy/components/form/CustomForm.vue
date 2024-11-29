<script setup lang="ts" generic="T">
import { FormKitSchema, useFormKitContextById } from "@formkit/vue";
import { reset } from "@formkit/core";

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


const model = defineModel<T>();
defineProps<{
  pending: boolean;
}>();
defineEmits(["submit"]);

const formContext = useFormKitContextById("formId");
const onReset = () => {
  reset("formId");
};
</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-9 edit-form-content scrollable">
      <FormKit
        id="formId"
        v-model="model"
        type="form"
        :disabled="pending"
        :actions="false"
        @submit="$emit('submit')"
      >
      
      <slot />
        
      </FormKit>
    </div>

    <FormActionMenu
      :pending="pending"
      :dirty="formContext?.state.dirty ?? false"
      :valid="formContext?.state.valid ?? false"
      @reset="onReset"
      @submit="$emit('submit')"
    />
  </div>
</template>
