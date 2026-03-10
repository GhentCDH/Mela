<template>
  <table class="border border-gray-300 table table-zebra table-sm">
    <tbody>
      <tr
        v-for="link in links"
        :key="link.id"
      >
        <th>{{ link.purpose }}</th>
        <td class="max-w-[300px]">
          <AnnotationText
            :store-id="storeId"
            :annotation="link.relation"
            :max-characters="25"
          />
        </td>
        <td>
          <Navbar :actions="actions(link)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAnnotationStore } from '../../store/anntotation.store';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { findPurposeLowerCase } from '../../../../../style/annotation.style';
import { useAnnotationDefStore } from '../../store/annotation-def.store';
import { AnnotationLink } from '../../../text-index/controls/annotate-text/utils/links';
import AnnotationText from './Annotation-text.vue';
import { useAnnotationEditStore } from './AnnotationEdit.store';
import { IconEnum } from '@ghentcdh/ui';
import Navbar from '../navbar.vue';

const props = defineProps<{ annotation: W3CAnnotation; storeId: string }>();
const annotationStore = useAnnotationStore(props.storeId);
const annotationDefStore = useAnnotationDefStore();
const annotationEditStore = useAnnotationEditStore();

const links = computed(() => {
  return annotationStore.utils
    .annotationLinks(props.annotation)
    .map((link: AnnotationLink) => {
      const purpose = findPurposeLowerCase(link.annotation);
      const relation = link.relations.find((r) => r.id !== props.annotation.id);

      return {
        purpose: annotationDefStore.definition[purpose].label,
        annotation: link.annotation,
        relation,
      };
    });
});

const actions = (link: AnnotationLink) => {
  return [
    {
      icon: IconEnum.Delete,
      label: 'Delete',
      disabled: annotationEditStore.disabled,
      action: () => {
        console.log('delete link');
        console.log(link);
        annotationStore.deleteAnnotation(link.annotation);
      },
    },
  ];
};
</script>
