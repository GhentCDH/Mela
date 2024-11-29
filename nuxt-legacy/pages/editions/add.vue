<script setup lang="ts">

import { FormKitSchema } from "@formkit/vue";

import CustomForm from "~/components/form/CustomForm.vue";
import type { Lookup, EditionCreate, PhraseCreate } from "~/types";

const EditionCreateForm = CustomForm<EditionCreate>;


useHead({
  title: "Add edition",
});

const { pageLoaded } = usePageLoaded();

const edition = ref<EditionCreate>({
  content: "",
  phrases: [{} as PhraseCreate],
});


const { onSubmit, pending: savePending } = useSubmit<Ref<EditionCreate>>(
  edition,
  "POST",
  "/api/editions",
  (error) => {
    useNotifications().addError("Error while saving the edition data: " + error);
  },
  async () => {
    useNotifications().addSuccess(
      `Edition "${edition.value.title}" successfully added`,
    );
    await navigateTo(`/editions/${edition.value.id}`);
  },
);
const {
  data: manuscripts,
  pending: manuscriptsPending,
  error: lookuplistError,
} = await useFetch<Lookup[]>("/api/manuscripts/lookup");

if (!manuscripts.value) {
  useNotifications().addError("Error while fetching lookup manuscript list");
}


const {
  data: authors,
  pending: authorsPending,
  error: authorsError,
} = await useFetch<Lookup[]>("/api/authors/lookup");

if (!authors.value) {
  useNotifications().addError("Error while fetching lookup authors list");
}

const textSchema = createEditionSchema(manuscripts, authors);

const pending = computed(() => {
  return !pageLoaded.value || savePending.value;
});

const addEmptyPhrase = () => {
  edition.value.phrases.push({} as PhraseCreate);
};
</script>

<template>
  <div v-if="!authorsError">
    <h1>Adding a new edition "{{ edition.name }}"</h1>

    <EditionCreateForm
      v-model="edition"
      :pending="pending"
      @submit="onSubmit"
    >

      <FormKitSchema :schema="textSchema" />

      

    </EditionCreateForm>

    
    
    
  </div>
</template>
