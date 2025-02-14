---
Card
---

<script setup>
import {
Card
} from "@ghentcdh/ui";

</script>
# Card


<Card class="w-96">
    <template #title>Header</template>
    Content
    <template #actions >
      <button class="btn btn-primary">
          Some action
        </button>
    </template>
  </Card>