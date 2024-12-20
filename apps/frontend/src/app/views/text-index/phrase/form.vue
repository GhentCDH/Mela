<template>
  <div class="card bg-base-100 w-full shadow border-2">
    <div class="py-2">
      <router-link
        :to="{ name: 'text-index-phrase-list' }"
        class="btn btn-link"
      >
        Back to list
      </router-link>
    </div>
    <FormWithActions
      :id="store.phrase_store_id"
      :form-schema="phraseFormSchema"
      :create-title="'Create Phrase'"
      :model-value="formData"
      @success="onSuccess"
    />
  </div>
</template>
<script setup lang="ts">
import { phraseFormSchema } from '@mela/text/shared';
import { computed } from 'vue';

import { FormWithActions } from '@ghentcdh/ui';

import { usePhraseStore } from '../phrase.store';

const store = usePhraseStore();
const formData = computed(() => {
  return {
    ...store.phrase,
    text_id: store.text?.id,
  };
});

const onSuccess = () => {
  store.reload();
};
</script>
