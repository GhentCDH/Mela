<template>
  <Loading :loading="!formData" />
  <div class="h-full flex flex-col gap-2 overflow-hidden">
    <div
      class="bg-white w-full border border-gray-300 p-2 flex-grow overflow-y-auto"
    >
      <FormComponent
        v-if="formData"
        :id="`modal-${id}`"
        v-model="formData"
        :schema="formSchema.form.schema"
        :uischema="formSchema.form.uiSchema"
        @valid="onValid($event)"
        @change="onChange"
        @errors="onErrors"
      />
    </div>
    <div class="flex justify-end gap-2 p-2 border-t-1 border-gray-300 z-[30]">
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
        :disabled="textId === NEW_SECTION_ID || !textId"
        @click="goToAnnotations"
      >
        Create annotations
      </Btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SectionFormSchema } from '@mela/text/shared';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { FormComponent } from '@ghentcdh/json-forms-vue';
import { Btn, Color } from '@ghentcdh/ui';

import { useWorkMenu } from './work-menu.store';
import Loading from '../../ui/loading.vue';
import { useSectionStore } from './section-store';
import { NEW_SECTION_ID } from '../../utils/create-section';

const id = `section`;
const sectionStore = useSectionStore();

const valid = ref(false);
const formData = ref(null);
const formSchema = SectionFormSchema.schema;
const workMenuStore = useWorkMenu();
const router = useRouter();

const textId = ref(null);

const onValid = (v: boolean) => {
  console.table(formData.value);
  console.table(formData.value.text);
  valid.value = v;
};

const onChange = (data: any) => {
  formData.value = data;
};

const onCancel = () => {
  formData.value = sectionStore.section
    ? SectionFormSchema.dtoSchema.parse(sectionStore.section)
    : null;
  textId.value = sectionStore.section?.id;
  valid.value = false;
};

const onErrors = (errors: any) => {
  console.table(errors);
};

const onSubmit = () => {
  if (!valid.value) return;

  sectionStore.saveOrUpdate(formData.value).then((section) => {
    textId.value = sectionStore.section?.id;
    sectionStore.reload();
  });
  alert(
    'Section saved, existing annotations are not updated, this is still a manual process',
  );
};

const goToAnnotations = () => {
  if (!textId.value) return;

  router.push({
    name: 'annotation-editor',
    params: { textId: textId.value },
  });
};

watch(
  () => sectionStore.section,
  () => {
    onCancel();
  },
  { immediate: true },
);

onMounted(() => {
  workMenuStore.resetMenu();
  workMenuStore.resetBreadcrumbs();
  workMenuStore.resetView();
});
</script>
