<template>
  <div
    v-if="store.text"
    class="max-w-screen-lg m-auto"
  >
    <div>Upload file</div>
    <div class="flex gap-2">
      <input
        type="file"
        class="file-input file-input-bordered file-input-sm w-full max-w-xs"
        :accept="allowedFileTypes"
        @change="onFilePicked"
      >
      <Btn
        :outline="true"
        :disabled="!excellFile"
        @click="upload"
      >
        Upload excel
      </Btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { textParseFileTypes } from '@mela/text/shared';
import { ref } from 'vue';

import { Btn } from '@ghentcdh/ui';

import { useTextStore } from './text.store';

const store = useTextStore();

const excellFile = ref<File | null>(null);
const allowedFileTypes = textParseFileTypes.join(', ');

const onFilePicked = (event: Event) => {
  const files = event.target.files;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(files[0]);
  excellFile.value = files[0];
};
const upload = () => {
  store.uploadExcel(excellFile.value);
};
</script>
