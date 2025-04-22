<template>
  <div class="m-auto max-w-lg p-2">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Chapters
      </li>
      <li
        v-for="chapter in bookStore.book?.chapter"
        :key="chapter.id"
        class="list-row items-center"
      >
        <div class="text-xl font-thin opacity-30 tabular-nums">
          {{ chapter.chapter_number }}
        </div>
        <div class="list-col-grow">
          <div>{{ chapter.name }}</div>
        </div>
        <div>
          <Btn
            :icon="IconEnum.Edit"
            :outline="true"
            @click="editChapter(chapter)"
          >
            Edit
          </Btn>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { Btn, IconEnum } from '@ghentcdh/ui';

import { useBookMenuStore } from './book-menu.store';
import { useBookStore } from './book.store';
import router from '../../../router';

const bookStore = useBookStore();
const bookMenuStore = useBookMenuStore();

const editChapter = (chapter: any) => {
  router.push({
    name: 'chapter-detail',
    params: { chapterId: chapter.id, bookId: bookStore.book.id },
  });
};

onMounted(() => {
  bookMenuStore.resetMenu();
  bookMenuStore.resetBreadcrumbs();
});
</script>
