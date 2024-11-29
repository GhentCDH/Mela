<script setup lang="ts">
useHead({
  title: "Manuscripts",
});

import type { Manuscript } from "~/types";

const confirm = useConfirm();

const { data: list, error: fetchError } =
  await useFetch<Manuscript[]>("/api/manuscripts");

const deleteError = ref(false);
const loading = ref(false);

async function onDelete(id: number) {
  loading.value = true;
  const { headers } = await useAuthorizationHeaders();
  try {
    await $fetch(`/api/manuscripts/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    if (list.value)
      list.value = list.value.filter((element) => element.id !== id);
    deleteError.value = false;
  } catch (error) {
    deleteError.value = true;
  }
  loading.value = false;
}

const onConfirmDelete = (id: number) => {
  confirm.require({
    message: "Are you sure you want to remove the item?",
    header: "Remove item",
    icon: "icon-delete",
    rejectLabel: "Cancel",
    acceptLabel: "Remove",
    acceptClass: "p-button-danger",
    accept: () => onDelete(id),
  });
};
</script>

<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <Message v-if="deleteError" severity="error" :sticky="true">
      Error while trying to delete the data
    </Message>
    <Message v-if="fetchError" severity="error" :sticky="true">
      Error while fetching the data
    </Message>
    
    <DataTable v-else :value="list">

      <Column field="id" header="Id">
        <template #body="slotProps">
          <Link :to="`/manuscripts/${slotProps.data.id}`">
            {{ slotProps.data.id }}
          </Link>
        </template>
      </Column>

      <Column field="name" header="Name" />
      
      <Column header="Actions">
        <template #body="slotProps">
          <Link :to="`/manuscripts/${slotProps.data.id}/edit`"
            ><Button icon="pi pi-pencil" text raised
          /></Link>
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            raised
            @click="onConfirmDelete(slotProps.data.id)"
          />
        </template>
      </Column>

    </DataTable>

    <div>
      <a href="/manuscripts/add">
        <Button icon="pi pi-plus" text raised></Button>
      </a>
    </div>
  </div>
</template>
