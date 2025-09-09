<template>
  <div class="m-auto max-w-lg p-2">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Chapters
      </li>
      <li
        v-for="chapter in bookStore.chapters"
        :key="chapter.id"
        class="list-row items-center"
      >
        <div class="text-xl font-thin opacity-30 tabular-nums">
          {{ chapter.chapter_number }}
        </div>
        <div class="list-col-grow">
          <div>{{ chapter.name }}</div>
        </div>
        <div class="flex gap-2">
          <Btn
            :icon="IconEnum.Edit"
            :outline="true"
            @click="editChapter(chapter)"
          >
            Edit
          </Btn>
          <Btn
            :icon="IconEnum.Edit"
            :outline="true"
            @click="editAnnotations(chapter)"
          >
            Annotations
          </Btn>
        </div>
      </li>
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
        <Btn
          :icon="IconEnum.Plus"
          @click="createChapter"
        >
          Create chapter
        </Btn>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { Btn, IconEnum } from '@ghentcdh/ui';

import { useBookMenuStore } from './book-menu.store';
import { NEW_CHAPTER_ID, useBookStore } from './book.store';
import router from '../../../router';

const bookStore = useBookStore();
const bookMenuStore = useBookMenuStore();

const editChapter = (chapter: any) => {
  router.push({
    name: 'chapter-detail',
    params: { chapterId: chapter.id, bookId: bookStore.book.id },
  });
};
const editAnnotations = (chapter: any) => {
  router.push({
    name: 'text-index-annotate',
    params: {
      chapterId: chapter.id,
      bookId: bookStore.book.id,
      textId: chapter.text[0].id,
    },
  });
};

onMounted(() => {
  bookMenuStore.resetMenu();
  bookMenuStore.resetBreadcrumbs();
});

const createChapter = () => {
  editChapter({ id: NEW_CHAPTER_ID });
};
</script>
