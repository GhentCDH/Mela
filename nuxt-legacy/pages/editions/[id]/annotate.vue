<script setup lang="ts">
import { createEditionAnnotator, W3CEditionFormat } from "@recogito/text-annotator";
import type { Edition } from "~/types";

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
});

const visible = ref(false);

const id = useRoute().params.id;
const { data: item_data, error } = await useFetch<Edition>(`/api/editions/${id}`);

// Display NotFound page when not found
if (error.value?.statusCode === 404) {
  throw error.value;
}

const altKeyDown = ref(false);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.altKey) {
    console.log("Alt/Option key pressed during keydown.");
  }
  altKeyDown.value = event.altKey;
};

onMounted(() => {
  const contentContainer = document.getElementById("content");
  const style = (annotation, state, z) => {
    //console.log('style call', annotation, state, z);
    return {
      fillOpacity: 0.2,
      underlineColor: altKeyDown.value ? "#0000FF" : "#00FF00",
      underlineOffset: z * 3,
      underlineThickness: 1,
    };
  };

  const r = createEditionAnnotator(contentContainer, {
    adapter: W3CEditionFormat("https://www.gutenberg.org", contentContainer),
    renderer: "CANVAS",
    mode: "html",
    style,
  });

  r.loadAnnotations("/annotations.w3c.json").then((a) =>
    console.log("loaded annotations from json file", a.length),
  );

  r.on("createAnnotation", (annotation) => {
    if (altKeyDown.value) {
      annotation.properties = annotation.properties || {};
      annotation.properties["color"] = "#0000FF";

      console.log("alt createAnnotation", annotation);
    } else {
      console.log("createAnnotation", annotation);
    }
  });

  r.on("updateAnnotation", (annotation, previous) => {
    console.log("updateAnnotation", annotation, previous);
  });

  r.on("deleteAnnotation", (annotation) => {
    console.log("deleteAnnotation", annotation);
  });

  r.on("selectionChanged", (annotations) => {
    console.log("selectionChanged", annotations);
    if (annotations.length > 0)
      console.log(
        "selectionChanged",
        annotations[0].target[0].selector[0].exact,
      );
  });

  r.on("viewportIntersect", (annotations) => {
    console.log("viewport", annotations);
  });

  window.r = r;
});

if (error.value) {
  useNotifications().addError("Error while fetching the book data");
}
useHead({
  title: `Edition "${item_data?.value?.name}"`,
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

    <div id="content" @keydown="handleKeydown" @keyup="handleKeydown">
      <DataTable :value="item_data?.phrases">
        <Column
          field="phrase_number"
          header="Nr"
          class="not-annotatable"
        ></Column>
        <Column
          field="content"
          header="Content"
          class="not-annotatable"
        ></Column>
        <Column field="translation" header="Translation"></Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="visible"
      header="Edit Profile"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">Update your information.</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Username</label>
        <InputEdition id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputEdition id="email" class="flex-auto" autocomplete="off" />
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
