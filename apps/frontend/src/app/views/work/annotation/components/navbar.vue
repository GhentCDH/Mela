<template>
  <div class="flex gap-1 py-1">
    <template v-for="item in actions" :key="item.label">
      <div v-if="item.children?.length" class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-sm btn-ghost tooltip tooltip-bottom"
          :data-tip="item.label"
        >
          <Icon :icon="item.icon" size="sm" />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm z-20"
        >
          <li v-for="child in item.children" :key="child.label">
            <a @click="closeDropdown(child.action)">{{ child.label }}</a>
          </li>
        </ul>
      </div>

      <div v-else class="tooltip tooltip-bottom" :data-tip="item.label">
        <button class="btn btn-sm btn-ghost" @click="item.action">
          <Icon :icon="item.icon" size="sm" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon, IconEnum } from '@ghentcdh/ui';

export interface NavbarChildAction {
  label: string;
  action: () => void;
}

export interface NavbarAction {
  icon: IconEnum;
  label: string;
  action?: () => void;
  children?: NavbarChildAction[];
}

const closeDropdown = (action: () => void) => {
  action();
  (document.activeElement as HTMLElement)?.blur();
};

const properties = defineProps<{
  actions: NavbarAction[];
}>();
</script>
