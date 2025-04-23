import {
  createTextSelectionAnnotation,
  SourceModel,
} from '../../libs/annotations/core';

const source1 = {
  uri: 'text:text-1',
  id: 'text-1',
  type: 'text',
  content: {
    processingLanguage: 'gr',
    text: `Tit. Παρατηρήματα ἀναγκαῖα τῶν Ἀττικῶν συνηθείας ἐκλεγέντα, παρὰ τοῦ λογιωτάτου μοναχοῦ κυροῦ Μαξίμου τοῦ Πλανούδη:-

1C Ἀντὶ τοῦ εἰπεῖν∙ μνημονεύω τοῦ δεῖνος, διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν∙ οὕτω καὶ διὰ φροντίδος ἔχω τὸν δεῖνα∙ καὶ δι᾿ ἀγάπης∙ καὶ δι’ ἀμελείας∙ καὶ δι’ ἐπαίνου∙ καὶ διὰ ψόγου, ἀντὶ τοῦ φρονέω∙ καὶ ἀγαπῶ∙ καὶ ἀμελῶ∙ καὶ ἐπαινῶ∙ καὶ ψέγω:-

2C Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς ἰδιωτικῶς, ἰδίᾳ λέγουσιν∙ οἷον ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος:-`,
  },
} as SourceModel;
const oneLine = {
  uri: 'text:text-online',
  id: 'text-online',
  type: 'text',
  content: {
    processingLanguage: 'gr',
    text: `Tit. Παρατηρήματα ἀναγκαῖα τῶν Ἀττικῶν συνηθείας ἐκλεγέντα, παρὰ τοῦ λογιωτάτου μοναχοῦ κυροῦ Μαξίμου τοῦ Πλανούδη:-

1C Ἀντὶ τοῦ εἰπεῖν∙ μνημονεύω τοῦ δεῖνος, διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν∙ οὕτω καὶ διὰ φροντίδος ἔχω τὸν δεῖνα∙ καὶ δι᾿ ἀγάπης∙ καὶ δι’ ἀμελείας∙ καὶ δι’ ἐπαίνου∙ καὶ διὰ ψόγου, ἀντὶ τοῦ φρονέω∙ καὶ ἀγαπῶ∙ καὶ ἀμελῶ∙ καὶ ἐπαινῶ∙ καὶ ψέγω:-

2C Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς ἰδιωτικῶς, ἰδίᾳ λέγουσιν∙ οἷον ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος:-`,
  },
};
const source2 = {
  uri: 'text:text-2',
  id: 'text-2',
  type: 'text',
  content: {
    processingLanguage: 'gr',
    text: `Tit. (transl): Indispensable, to-be-adhered-to norms of the linguistic habit of the users of Attic selected by the most learned monk Maximos Planoudes.



1C transl. Instead of saying “μνημονεύω τοῦ δεῖνος [I remember so-and-so]”, they say “διὰ μνήμης ἔχω τὸν δεῖνα [I have so-and-so in memory]”. In the same way, they say: “διὰ φροντίδος ἔχω τὸν δεῖνα [I have so-and-so in thought]” and “δι᾿ ἀγάπης [with/ in love]” and “δι᾿ ἀμελείας [with/ in neglect]” and “δι᾿ ἐπαίνου [with/ in praise]” and “διὰ ψόγου [with/ in blame]”, instead of “φρονέω [I think]”, “ἀγαπῶ [I love]”, “ἀμελῶ [I neglect]”, “ἐπαινῶ [I approve]”, “ψέγω [I blame]”.



2C Transl. Instead of commonly saying “ἰδικῶς [in a private/ personal manner]”, they say “ἰδίᾳ [privately]”, as: “ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος [I spoke privately with so-and-so, as there was no one else around]”.`,
  },
} as SourceModel;

const annotations = [
  createTextSelectionAnnotation(
    source1,
    {
      start: 18,
      end: 29,
    },
    'paragraph',
  ),
  createTextSelectionAnnotation(
    source1,
    {
      start: 4,
      end: 113,
    },
    'title',
  ),
  createTextSelectionAnnotation(
    source2,
    {
      start: 15,
      end: 149,
    },
    'title',
  ),
  createTextSelectionAnnotation(
    source1,
    {
      start: 120,
      end: 360,
    },
    'title',
  ),
  createTextSelectionAnnotation(
    source2,
    {
      start: 160,
      end: 632,
    },
    'title',
  ),
];

export const demoAnnotations = { annotations, source1, source2, oneLine };
