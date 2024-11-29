<script setup lang="ts">
import type { Text } from "~/types";

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
});

const visible = ref(false);

const id = useRoute().params.id;
const { data: item_data, error } = await useFetch<Text>(`/api/authors/${id}`);

// Display NotFound page when not found
if (error.value?.statusCode === 404) {
  throw error.value;
}

if (error.value) {
  useNotifications().addError("Error while fetching the data");
}

useHead({
  title: `Text "${item_data?.value?.name}"`,
});
</script>

<template>
  <div v-if="!error">
    <div class="title-wrapper">
      <h1>{{ item_data?.name }}</h1>
      <Link
        :to="`/authors/${id}/edit`"
        class="title-link"
        title="Edit this page"
      >
        <Button icon="pi pi-pencil" text raised />
      </Link>
    </div>
    <DL>
      <DT>Name</DT>
      <DD>{{ item_data?.name }}</DD>
    </DL>
  </div>
</template>
