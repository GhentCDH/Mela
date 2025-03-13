import type { AnnotationMetadataType, AnnotationType } from '@mela/text/shared';
import { ref } from 'vue';

import { useAnnotationRepository } from '../../../../../repository/annotation.repository';
import { useTextRepository } from '../../../../../repository/text.repository';

type SelectedIds = { textContentId: string; annotationId: string };

export type Filter = {
  annotationType?: AnnotationMetadataType[];
};

export class AnnotationService {
  private textId: string;
  public readonly annotations = ref([]);
  public readonly loading = ref(true);

  private readonly textRepository = useTextRepository();
  private readonly annotationRepository = useAnnotationRepository();

  public async load(textId: string) {
    this.textId = textId;
    return this.reload();
  }

  public async reload() {
    this.loading.value = false;
    const annotations = await this.textRepository.getAnnotations(this.textId);
    this.loading.value = true;
    this.annotations.value = annotations.items;
    return annotations.items;
  }

  public async createMulti(newAnnotations: AnnotationType[]) {
    if (newAnnotations.length === 0) return;

    this.loading.value = true;
    await this.annotationRepository.createMulti(newAnnotations);

    return this.reload();
  }

  public async create(newAnnotations: AnnotationType) {
    this.loading.value = true;
    await this.annotationRepository.create(newAnnotations);

    return this.reload();
  }

  public async patch(annotationId: string, annotation: AnnotationType) {
    this.loading.value = true;
    await this.annotationRepository.patch(annotationId, annotation);

    return this.reload();
  }

  public async delete(annotationId: string) {
    this.loading.value = true;
    await this.annotationRepository.delete(annotationId);

    return this.reload();
  }
}
