<script setup lang="ts">
import { createTextAnnotator, W3CTextFormat } from "@recogito/text-annotator";
import type { Edition } from "~/types";

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
});

const visible = ref(false);

const id = useRoute().params.id;
const { data: item_data, error } = await useFetch<Text>(`/api/editions/${id}`);

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
        :to="`/editions/${id}/edit`"
        class="title-link"
        title="Edit this page"
      >
        <Button icon="pi pi-pencil" text raised />
      </Link>
    </div>
    <DL>
      <DT>Year</DT>
      <DD>{{ item_data?.year }}</DD>
    </DL>

    <br /><br />

    <DataTable :value="item_data?.phrases">
      <Column
        field="phrase_number"
        header="Nr"
        class="not-annotatable"
      ></Column>
      <Column field="content" header="Content" class="not-annotatable"></Column>
      <Column field="translation" header="Translation"></Column>
    </DataTable>

    <Dialog
      v-model:visible="visible"
      header="Edit Profile"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">Update your information.</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Username</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style>
canvas {
  z-index: 1000;
}
</style>
