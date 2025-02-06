import { W3CAnnotation } from './w3c/types';

const _DictionaryDemo: W3CAnnotation[] = [
  {
    id: 'e245060f-fc67-436f-8c41-5e52f4b67c8d',
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      { type: 'AnnotationType', textType: 'phrase' },
      {
        type: 'TextualBody',
        format: 'text',
        language: 'gr',
        value:
          '2C Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς ἰδιωτικῶς, ἰδίᾳ λέγουσιν∙ οἷον ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος:-',
      },
    ],
    target: [
      {
        source: 'mela/text/954d9ec8-920b-4749-a7f4-d526e297837e',
        textDirection: 'ltr',
        type: 'Text',
        processingLanguage: 'gr',
        selector: {
          type: 'TextPositionSelector',
          start: 362,
          end: 467,
        },
      },
    ],
  },
  {
    id: '88abfd2e-4eab-4eac-a291-5e4086f1fa84',
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      { type: 'AnnotationType', textType: 'phrase' },
      {
        type: 'TextualBody',
        format: 'text',
        language: 'gr',
        value:
          '1C Ἀντὶ τοῦ εἰπεῖν∙ μνημονεύω τοῦ δεῖνος, διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν∙ οὕτω καὶ διὰ φροντίδος ἔχω τὸν δεῖνα∙ καὶ δι᾿ ἀγάπης∙ καὶ δι’ ἀμελείας∙ καὶ δι’ ἐπαίνου∙ καὶ διὰ ψόγου, ἀντὶ τοῦ φρονέω∙ καὶ ἀγαπῶ∙ καὶ ἀμελῶ∙ καὶ ἐπαινῶ∙ καὶ ψέγω:-',
      },
    ],
    target: [
      {
        source: 'mela/text/954d9ec8-920b-4749-a7f4-d526e297837e',
        textDirection: 'ltr',
        type: 'Text',
        processingLanguage: 'gr',
        selector: {
          type: 'TextPositionSelector',
          start: 118,
          end: 360,
        },
      },
    ],
  },
  {
    // The W3C Annotation model
    id: 'mela/annotation/3526e470-a3dc-44f2-ade8-8fcc614c1cc2',
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      { type: 'AnnotationType', textType: 'phrase' },
      {
        type: 'TextualBody',
        format: 'text',
        language: 'en',
        value:
          'Tit. (transl): Indispensable, to-be-adhered-to norms of the linguistic habit of the users of Attic selected by the most learned monk Maximos Planoudes.',
      },
      {
        type: 'TextualBody',
        // type: 'phrase',
        format: 'text',
        language: 'gr',
        value:
          'Tit. Παρατηρήματα ἀναγκαῖα τῶν Ἀττικῶν συνηθείας ἐκλεγέντα, παρὰ τοῦ λογιωτάτου μοναχοῦ κυροῦ Μαξίμου τοῦ Πλανούδη:-',
      },
    ],
    target: [
      {
        source: 'mela/text/954d9ec8-920b-4749-a7f4-d526e297837e',
        textDirection: 'ltr',
        type: 'Text',
        processingLanguage: 'gr',
        selector: {
          type: 'TextPositionSelector',
          start: 0,
          end: 116,
        },
      },
      {
        source: 'mela/text/954d9ec8-920b-4749-a7f4-d526e297837e',
        textDirection: 'ltr',
        type: 'Text',
        processingLanguage: 'en',
        selector: {
          type: 'TextPositionSelector',
          start: 0,
          end: 150,
        },
      },
    ],
  },
];

export const DictionaryDemo = { id: 'abc', items: _DictionaryDemo };
