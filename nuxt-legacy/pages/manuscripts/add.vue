<script setup lang="ts">
import SchemaBased from "~/components/form/SchemaBased.vue";
import type { Lookup, ManuscriptCreate } from "~/types";

const ManuscriptCreateForm = SchemaBased<ManuscriptCreate>;

useHead({
  title: "Add manuscript",
});

const { pageLoaded } = usePageLoaded();

const manuscript = ref<ManuscriptCreate>({
  content: "",
});

const {
  data: editions,
  pending: editionsPending,
  error: editionsError,
} = await useFetch<Lookup[]>("/api/editions/lookup");
if (editionsError.value) {
  useNotifications().addError("Error while fetching editions");
}

const manuscriptSchema = createManuscriptSchema(editions);

const { onSubmit, pending: savePending } = useSubmit<Ref<ManuscriptCreate>>(
  manuscript,
  "POST",
  "/api/manuscripts",
  (error) => {
    useNotifications().addError(
      "Error while saving the manuscript data: " + error,
    );
  },
  async () => {
    useNotifications().addSuccess(
      `Manuscript "${manuscript.value.title}" successfully added`,
    );
    await navigateTo(`/manuscripts/${manuscript.value.id}`);
  },
);

const pending = computed(() => {
  return !pageLoaded.value || savePending.value;
});
</script>

<template>
  <div v-if="!authorsError">
    <h1>Adding a new manuscript "{{ manuscript.name }}"</h1>
    <ManuscriptCreateForm
      v-model="manuscript"
      :pending="pending"
      :schema="manuscriptSchema"
      @submit="onSubmit"
    />
  </div>
</template>
000
