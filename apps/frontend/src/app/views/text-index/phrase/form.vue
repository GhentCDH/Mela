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
      :id="phrase_store_id"
      :form-schema="phraseFormSchema"
      :create-title="'Create Phrase'"
      :model-value="formData"
    />
  </div>
</template>
<script setup lang="ts">
import { phraseFormSchema } from '@mela/text/shared';
import { useRoute } from 'vue-router';

import { FormWithActions } from '@ghentcdh/ui';

import { phrase_store_id } from './phrase.const';

let formData = { text_id: useRoute().params.textId };
</script>
