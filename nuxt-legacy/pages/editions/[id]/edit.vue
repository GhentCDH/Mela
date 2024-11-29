<script setup lang="ts">
import SchemaBased from "~/components/form/SchemaBased.vue";
import type { Lookup, Edition } from "~/types";
import { useFormKitSchema } from "@sfxcode/formkit-primevue";
const {  addListGroupFunctions } = useFormKitSchema()

const EditionEditForm = SchemaBased<Edition | null>;

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
  middleware: "authentication",
});

useHead({
  title: "Edit edition",
});

const { pageLoaded } = usePageLoaded();
const id = useRoute().params.id;

const {
  data: edition,
  pending: editionPending,
  error: editionError,
} = await useFetch<Edition>(`/api/editions/${id}`);
if (editionError.value) {
  useNotifications().addError("Error while fetching the edition data");
}

//const phrases =  JSON.parse(JSON.stringify(edition.value?.phrases));
//edition.value.phrases = [];

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





const { onSubmit, pending: savePending } = useSubmit<Ref<Edition | null>>(
  edition,
  "PUT",
  `/api/editions/${id}`,
  () => {
    useNotifications().addError("Error while saving the text data");
  },
  async () => {
    useNotifications().addSuccess(
      `Text "${edition?.value?.name}" successfully updated`,
    );
    await navigateTo(`/editions/${edition?.value?.id}`);
  },
);


var editionReactive = reactive({});

const pending = computed(() => {
  return !pageLoaded.value || editionPending.value || savePending.value;
});


var textSchema = ref({});

onMounted(() => {

  console.log("Edition reactive",JSON.stringify(edition.value));
    editionReactive = reactive(JSON.parse(JSON.stringify(edition.value)));
    //can not add functions to an object at nuxt server side since
    //objects should be serializable (can not stringify functions)
    addListGroupFunctions(editionReactive, () => {return {}})
    //addListGroupFunctions(edition, () => {return {}})


    console.log("Added group functions to object");
    //console.log(edition.value.moveNodeUp);
    //console.log(edition.moveNodeUp);

    textSchema.value = createEditionSchema(manuscripts, authors);
  });

</script>

<template>

  <div v-if="!editionError">

    <div class="title-wrapper">
      <h1>Editing text "{{ edition?.name }}"</h1>
      <Link :to="`/editions/${id}`" class="title-link" title="View this page">
        <Button icon="pi pi-eye" text raised />
      </Link>
    </div>

    <ClientOnly>
      <EditionEditForm
      v-model="editionReactive"
      :pending="pending"
      :schema="textSchema"
      @submit="onSubmit"
    />
    </ClientOnly>
    
  </div>
</template>
