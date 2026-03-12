<template>
  <Drawer
    class="_h-full"
    :width-left="300"
    :width-right="20"
  >
    <template #left-drawer>
      <div class="gap-2 flex flex-col">
        <SectionsMenu />
      </div>
    </template>
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
  </Drawer>
</template>
<script setup lang="ts">
import { SectionFormSchema } from '@mela/text/shared';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { FormComponent } from '@ghentcdh/json-forms-vue';
import { Btn, Color, Drawer } from '@ghentcdh/ui';
import Loading from '../../ui/loading.vue';
import { useSectionStore } from './section-store';
import { NEW_SECTION_ID } from '../../utils/create-section';
import SectionsMenu from './components/SectionsMenu.vue';
import { useWorkStore } from './work.store';

const id = `section`;
const sectionStore = useSectionStore();

const valid = ref(false);
const formData = ref(null);
const formSchema = SectionFormSchema.schema;
const workStore = useWorkStore();
const router = useRouter();

const textId = ref(null);

const onValid = (v: boolean) => {
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

const onSubmit = () => {
  if (!valid.value) return;

  sectionStore.saveOrUpdate(formData.value as any).then((section) => {
    console.log('section', section);
    workStore.editSection(section.id);
    sectionStore.reload();
    workStore.reload();
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
</script>
