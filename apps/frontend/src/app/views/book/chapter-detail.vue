<template>
  <FormComponent
    :id="`modal-${id}`"
    v-model="formData"
    :schema="formSchema.schema"
    :uischema="formSchema.uiSchema"
    @valid="onValid($event)"
    @change="onChange"
  />
  <div class="flex justify-end gap-2 p-2 border-t-1 border-gray-300">
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
import { ChapterFormSchema } from '@mela/text/shared';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { FormComponent } from '@ghentcdh/json-forms/vue';
import { Btn, Color } from '@ghentcdh/ui';

import { useBookMenuStore } from './book-menu.store';
import { useBookStore } from './book.store';

const id = `chapter`;
const bookStore = useBookStore();

const valid = ref(false);
const formData = ref({});
const formSchema = ChapterFormSchema.schema.form;
const bookMenuStore = useBookMenuStore();
const router = useRouter();

const textId = ref(null);

watch(
  () => bookStore.chapter,
  () => {
    formData.value = bookStore.chapter;
    textId.value = bookStore.chapter?.text[0].id;
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
  formData.value = bookStore.chapter;
};

const onSubmit = () => {
  if (!valid.value) return;

  bookStore.saveOrUpdate(formData.value).then((chapter) => {
    textId.value = bookStore.chapter?.text[0].id;
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
  bookMenuStore.resetMenu();
  bookMenuStore.resetBreadcrumbs();
});
</script>
