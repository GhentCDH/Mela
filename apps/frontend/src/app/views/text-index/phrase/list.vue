<template>
  <div
    v-if="phraseStore.text"
    class="max-w-screen-lg m-auto"
  >
    <div class="flex justify-end gap-2">
      <RouterLink
        class="btn btn-outline"
        :to="{ name: 'text-index-phrase-new' }"
      >
        Add Phase
      </RouterLink>
    </div>
    <TableComponent
      :uri="uriData"
      :columns="phraseFormSchema.columnSchema.columns"
      @edit="onEdit"
    />
  </div>
</template>
<script setup lang="ts">
import { phraseFormSchema } from '@mela/text/shared';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { TableComponent, useFormStore } from '@ghentcdh/ui';

import { usePhraseStore } from '../phrase.store';
import { phrase_store_id, phrase_uri } from './phrase.const';

const phraseStore = usePhraseStore();
const formStore = useFormStore(phrase_store_id);

const router = useRouter();

const uriData = computed(() => `${phrase_uri}?text_id=${phraseStore.text?.id}`);

const onEdit = (phraseId: string) => {
  router.replace({
    name: 'text-index-phrase-edit',
    params: { phraseId },
  });
};
</script>
