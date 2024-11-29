<script setup lang="ts">
import SchemaBased from "~/components/form/SchemaBased.vue";
import type { Manuscript, Lookup } from "~/types";

const ManuscriptEditForm = SchemaBased<Manuscript | null>;

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
  middleware: "authentication",
});

useHead({
  title: "Edit manuscript",
});

const { pageLoaded } = usePageLoaded();
const id = useRoute().params.id;

const {
  data: manuscript,
  pending: manuscriptPending,
  error: manuscriptError,
} = await useFetch<Manuscript>(`/api/manuscripts/${id}`);
if (manuscriptError.value) {
  useNotifications().addError("Error while fetching the manuscript data");
}

const {
  data: editions,
  pending: editionsPending,
  error: editionsError,
} = await useFetch<Lookup[]>("/api/editions/lookup");
if (editionsError.value) {
  useNotifications().addError("Error while fetching editions");
}

const manuscriptSchema = createManuscriptSchema(editions);

const { onSubmit, pending: savePending } = useSubmit<Ref<Manuscript | null>>(
  manuscript,
  "PUT",
  `/api/manuscripts/${id}`,
  () => {
    useNotifications().addError("Error while saving the manuscript data");
  },
  async () => {
    useNotifications().addSuccess(
      `"${manuscript?.value?.name}" successfully updated`,
    );
    await navigateTo(`/manuscripts/${manuscript?.value?.id}`);
  },
);

const pending = computed(() => {
  return !pageLoaded.value || manuscriptPending.value || savePending.value;
});
</script>

<template>
  <div v-if="!manuscriptError">
    <div class="title-wrapper">
      <h1>Editing manuscript "{{ manuscript?.name }}"</h1>
      <Link
        :to="`/manuscripts/${id}`"
        class="title-link"
        title="View this page"
      >
        <Button icon="pi pi-eye" manuscript raised />
      </Link>
    </div>
    <ManuscriptEditForm
      v-model="manuscript"
      :pending="pending"
      :schema="manuscriptSchema"
      @submit="onSubmit"
    />
  </div>
</template>
