<script setup lang="ts">
import SchemaBased from "~/components/form/SchemaBased.vue";
import type { Lookup, AuthorCreate } from "~/types";

const AuthorCreateForm = SchemaBased<AuthorCreate>;

useHead({
  title: "Add Author",
});

const { pageLoaded } = usePageLoaded();

const text = ref<AuthorCreate>({
  content: "",
});

const textSchema = createTextSchema();

const { onSubmit, pending: savePending } = useSubmit<Ref<AuthorCreate>>(
  text,
  "POST",
  "/api/texts",
  (error) => {
    useNotifications().addError("Error while saving the text data: " + error);
  },
  async () => {
    useNotifications().addSuccess(
      `Text "${text.value.title}" successfully added`,
    );
    await navigateTo(`/texts/${text.value.id}`);
  },
);

const pending = computed(() => {
  return !pageLoaded.value || savePending.value;
});
</script>

<template>
  <div v-if="!authorsError">
    <h1>Adding a new text "{{ text.name }}"</h1>
    <AuthorCreateForm
      v-model="text"
      :pending="pending"
      :schema="textSchema"
      @submit="onSubmit"
    />
  </div>
</template>
000
