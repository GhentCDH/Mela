const source1 = {
  uri: 'text:text-1',
  id: 'text-1',
  type: 'text',
  content: {
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
    text: `Tit. (transl): Indispensable, to-be-adhered-to norms of the linguistic habit of the users of Attic selected by the most learned monk Maximos Planoudes.



1C transl. Instead of saying “μνημονεύω τοῦ δεῖνος [I remember so-and-so]”, they say “διὰ μνήμης ἔχω τὸν δεῖνα [I have so-and-so in memory]”. In the same way, they say: “διὰ φροντίδος ἔχω τὸν δεῖνα [I have so-and-so in thought]” and “δι᾿ ἀγάπης [with/ in love]” and “δι᾿ ἀμελείας [with/ in neglect]” and “δι᾿ ἐπαίνου [with/ in praise]” and “διὰ ψόγου [with/ in blame]”, instead of “φρονέω [I think]”, “ἀγαπῶ [I love]”, “ἀμελῶ [I neglect]”, “ἐπαινῶ [I approve]”, “ψέγω [I blame]”.



2C Transl. Instead of commonly saying “ἰδικῶς [in a private/ personal manner]”, they say “ἰδίᾳ [privately]”, as: “ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος [I spoke privately with so-and-so, as there was no one else around]”.`,
  },
};

const annotations = [
  {
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    id: 'anno-1',
    type: 'Annotation',
    body: [
      {
        type: 'TextualBody',
        purpose: 'tagging',
        value: 'Person',
      },
      {
        type: 'TextualBody',
        purpose: 'describing',
        value:
          'This title indicates a collection of linguistic observations on Attic Greek expressions by Maximus Planudes.',
      },
    ],
    target: [
      {
        source: source1.uri,
        selector: {
          type: 'TextPositionSelector',
          start: 4,
          end: 113,
        },
      },
      {
        source: source2.uri,
        selector: {
          type: 'TextPositionSelector',
          start: 15,
          end: 149,
        },
      },
    ],
  },
];

export const demoAnnotations = { annotations, source1, source2 };
