<template>
  <Loading :loading="!formData" />
  <div class="h-full overflow-y-auto mb-20">
    <FormComponent
      v-if="formData"
      :id="`modal-${id}`"
      v-model="formData"
      :schema="formSchema.schema"
      :uischema="formSchema.uiSchema"
      @valid="onValid($event)"
      @change="onChange"
    />
  </div>
  <div
    class="sticky bottom-0 bg-white flex justify-end gap-2 p-2 border-t-1 border-gray-300 z-[30]"
  >
    <Btn
      :color="Color.secondary"
      :outline="true"
      @click="onCancel"
    >
      Cancel
    </Btn>
    <Btn
      :disabled="!valid"
      @click="onSubmit"
    >
      Save
    </Btn>
    <Btn
      :outline="true"
      :disabled="!textId"
      @click="goToAnnotations"
    >
      Create annotations
    </Btn>
  </div>
</template>
<script setup lang="ts">
import { SectionFormSchema } from '@mela/text/shared';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { FormComponent } from '@ghentcdh/json-forms-vue';
import { Btn, Color } from '@ghentcdh/ui';

import { useWorkMenu } from './work-menu.store';
import { useWorkStore } from './work.store';
import Loading from '../../ui/loading.vue';

const id = `section`;
const workStore = useWorkStore();

const valid = ref(false);
const formData = ref(null);
const formSchema = SectionFormSchema.schema.form;
const workMenuStore = useWorkMenu();
const router = useRouter();

const textId = ref(null);

watch(
  () => workStore.section,
  () => {
    formData.value = workStore.section;
    textId.value = workStore.section?.text[0].id;
    valid.value = false;
  },
  { immediate: true },
);

const onValid = (v: boolean) => {
  valid.value = v;
};

const onChange = (data: any) => {
  formData.value = data;
};

const onCancel = () => {
  formData.value = workStore.section;
};

const onSubmit = () => {
  if (!valid.value) return;

  workStore.saveOrUpdate(formData.value).then((section) => {
    textId.value = workStore.section?.text[0].id;
  });
  alert(
    'Chapter saved, existing annotations are not updated, this is still a manual process',
  );
};

const goToAnnotations = () => {
  if (!textId.value) return;

  router.push({
    name: 'text-index-annotate',
    params: { textId: textId.value },
  });
};

onMounted(() => {
  workMenuStore.resetMenu();
  workMenuStore.resetBreadcrumbs();
  workMenuStore.resetView();
});
</script>
