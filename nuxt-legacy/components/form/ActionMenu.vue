<script setup lang="ts">
defineProps<{
  pending: boolean;
  dirty: boolean;
  valid: boolean;
}>();

defineEmits(["reset", "submit"]);
</script>

<template>
  <div class="col-12 md:col-3 quick-nav">
    <h3>Actions</h3>
    <div>
      <Button
        :disabled="pending || !dirty || !valid"
        text
        raised
        @click="$emit('submit')"
      >
        Save
      </Button>
    </div>
    <div>
      <Button
        severity="warning"
        :disabled="pending || !dirty"
        text
        raised
        @click="$emit('reset')"
      >
        Reset
      </Button>
    </div>
  </div>
</template>
