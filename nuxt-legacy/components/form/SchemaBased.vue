<script setup lang="ts" generic="T">
import { FormKitSchema, useFormKitContextById } from "@formkit/vue";
import { reset, type FormKitGroupValue, type FormKitSchemaDefinition } from "@formkit/core";


//const model = defineModel<T>() as FormKitGroupValue;
defineProps<{
  pending: boolean;
  schema: FormKitSchemaDefinition;
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
        type="form"
        :disabled="pending"
        :actions="false"
        @submit="$emit('submit')"
      >
        <FormKitSchema :schema="schema" />
        
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
