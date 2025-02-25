# Default Modal

This is an example alert, if you want to add dynamic alerts. F.E. if you delete a row than you can use the `ModalService` so you don't need to worry about the handling logic.

```vue

<Modal modalTitle="a modal title"
       :open="modalOpen"
       @close-modal="closeMe">
  <template #content>
    Modal content
  </template>
  <template #actions>
    <Btn @click="closeMe">Close the modal</Btn>
  </template>
</Modal>
```


<script setup>
import { Modal, Btn } from "@ghentcdh/ui";
import { ref } from 'vue';

const modalOpen = ref(false);

const closeMe = () => {
    modalOpen.value = false;
}

</script>

<Btn @click="modalOpen = true">Open modal</Btn>

<Modal modalTitle="a modal title"
    :open="modalOpen"    
    @close-modal="closeMe">
    <template #content>
       Modal content 
    </template>
    <template #actions>
       <Btn @click="closeMe">Close the modal</Btn>
    </template>
</Modal>