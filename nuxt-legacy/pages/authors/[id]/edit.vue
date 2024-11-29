<script setup lang="ts">
import SchemaBased from "~/components/form/SchemaBased.vue";
import type { Lookup, Author } from "~/types";

const AuthorEditForm = SchemaBased<Author | null>;

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
  middleware: "authentication",
});

useHead({
  title: "Edit author",
});

const { pageLoaded } = usePageLoaded();
const id = useRoute().params.id;

const {
  data: author,
  pending: authorPending,
  error: authorError,
} = await useFetch<Text>(`/api/authors/${id}`);
if (authorError.value) {
  useNotifications().addError("Error while fetching the author data");
}

const authorSchema = createAuthorSchema();

const { onSubmit, pending: savePending } = useSubmit<Ref<Text | null>>(
  author,
  "PUT",
  `/api/authors/${id}`,
  () => {
    useNotifications().addError("Error while saving the author data");
  },
  async () => {
    useNotifications().addSuccess(
      `"${author?.value?.name}" successfully updated`,
    );
    await navigateTo(`/authors/${author?.value?.id}`);
  },
);

const pending = computed(() => {
  return !pageLoaded.value || authorPending.value || savePending.value;
});
</script>

<template>
  <div v-if="!authorError">
    
    <div class="title-wrapper">
      <h1>Editing author "{{ author?.name }}"</h1>
      <Link
        :to="`/authors/${id}`"
        class="title-link"
        title="View this page"
      >
        <Button icon="pi pi-eye" author raised />
      </Link>
    </div>

    <AuthorEditForm
      v-model="author"
      :pending="pending"
      :schema="authorSchema"
      @submit="onSubmit"
    />
  </div>
</template>
