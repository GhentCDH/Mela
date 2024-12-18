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
      :url-schema="phrase_schema_uri"
      :create-title="'Create Phrase'"
      :model-value="formData"
    />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

import { FormWithActions } from '@ghentcdh/ui';

import { phrase_schema_uri, phrase_store_id } from './phrase.const';

let formData = { text_id: useRoute().params.textId };
</script>
