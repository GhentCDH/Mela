import { Annotation } from '@ghentcdh/vue-component-annotated-text';
import {
  AnnotationMetadataType,
  AnnotationTypeBody,
  Language,
  TextPositionSelectorSchema,
  TextTargetSchema,
  TextualBody,
  TextualBodySchema,
  W3CAnnotation,
} from './types';
import { IdentifyColorMap } from '../../identify.color';

const mapAnnotationType = (type: AnnotationMetadataType) => {
  return type === 'paragraph' ? 'gutter' : 'text';
};
const transformAnnotation = (
  value: W3CAnnotation,
  type: AnnotationMetadataType,
  language: Language,
): MelaAnnotation => {
  const text = value.body.find(
    (b) => b.type === 'TextualBody' && b.language === language,
  ) as TextualBody;

  if (!text) return null;

  const target =
    value.target.find((t) => t.processingLanguage === language) ??
    value.target[0];

  // TODO find translated location in completeText text

  return {
    id: value.id,
    start: target.selector.start,
    end: target.selector.end,
    target: mapAnnotationType(type),
    color: IdentifyColorMap[type],
    transcription: {
      language,
      text: text.value,
    },
  } as MelaAnnotation;
};

export type MelaAnnotation = Annotation & {
  transcription: { language: string; text: string };
};

export class TranslatedAnnotationInstance {
  source: MelaAnnotation;
  translation: MelaAnnotation | undefined;
  transcription: { source: string; translation: string };
  type: AnnotationMetadataType;

  private constructor(
    private readonly annotation: W3CAnnotation,
    private readonly sourceText: string,
    private readonly translatedText: string,
  ) {
    this.createType();
    this.createSource();
    this.createTranslation();
    this.createTranscription();
  }

  public get id() {
    return this.annotation.id;
  }

  private createType() {
    this.type = this.annotation.body.find((b) => b.type === 'AnnotationType')
      ?.textType as string;
  }

  public changeType(type: AnnotationMetadataType) {
    this.type = type;
    const color = IdentifyColorMap[type];
    const _type = mapAnnotationType(type);
    this.source.color = color;
    this.source.target = _type;

    if (this.translation) {
      this.translation.color = color;
      this.translation.target = _type;
    }

    const annotationType = AnnotationTypeBody.parse({
      textType: type,
    });

    const body = this.annotation.body.filter(
      (a) => a.type === 'AnnotationType',
    );
    body.push(annotationType);

    this.annotation.body = body;
  }

  private createSource() {
    this.source = transformAnnotation(this.annotation, this.type, 'gr');
  }

  private createTranslation() {
    this.translation = transformAnnotation(this.annotation, this.type, 'en');
  }

  private createTranscription() {
    this.transcription = {
      source: this.source?.transcription.text,
      translation: this.translation?.transcription.text,
    };
  }

  static parse(
    annotation: W3CAnnotation,
    sourceText: string,
    translatedText: string,
  ) {
    return new TranslatedAnnotationInstance(
      annotation,
      sourceText,
      translatedText,
    );
  }

  update(start: number, end: number) {
    const text = this.sourceText.substring(start, end);
    this.updateBody('gr', text);
    this.updateSelector('gr', start, end);

    this.source.start = start;
    this.source.end = end;
    this.transcription.source = text;

    return this;
  }

  translate(start: number, end: number) {
    const translation = this.translatedText.substring(start, end);
    this.updateBody('en', translation);
    this.updateSelector('en', start, end);

    if (!this.translation) {
      this.createTranslation();
    }

    this.translation.start = start;
    this.translation.end = end;
    this.transcription.translation = translation;
    return this;
  }

  createW3CAnnotation() {
    // TODO render it again ...
    return this.annotation;
  }

  private updateSelector(language: Language, start: number, end: number) {
    if (language !== 'gr') return;

    const textTarget = TextTargetSchema.parse({
      source: this.annotation.target[0].source,
      textDirection: 'ltr',
      processingLanguage: language,
      selector: TextPositionSelectorSchema.parse({
        start,
        end,
      }),
    });

    const target = this.annotation.target.filter(
      (a) => a.type === 'Text' && a.processingLanguage === language,
    );
    target.push(textTarget);
    this.annotation.target = target;
  }

  private updateBody(language: Language, text: string) {
    const textualBody = TextualBodySchema.parse({
      language,
      value: text,
    });

    const body = this.annotation.body.filter(
      (a) => a.type === 'TextualBody' && a.language === language,
    );
    body.push(textualBody);

    this.annotation.body = body;
  }
}

// create type for TranslatedAnnotationInstance
export type TranslatedAnnotation = ReturnType<
  typeof TranslatedAnnotationInstance.parse
>;
