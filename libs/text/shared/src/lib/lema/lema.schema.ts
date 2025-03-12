// import { z } from 'zod';
//
// import {
//   ControlBuilder,
//   LayoutBuilder,
//   TableBuilder,
//   TextCellBuilder,
//   createSchema,
// } from '@ghentcdh/json-forms/core';
// import { LemaForm } from '@ghentcdh/mela/generated/forms';
// import type { Lema } from '@ghentcdh/mela/generated/types';
// import { LemaSchema, SpeechSchema } from '@ghentcdh/mela/generated/types';
//
// const uiSchema = LayoutBuilder.vertical<Lema>()
//   .addControls(
//     ControlBuilder.properties('word'),
//     ControlBuilder.properties('link'),
//     ControlBuilder.asObject('speech').autocomplete({
//       uri: '/api/speech?filter=name:',
//       field: {
//         id: 'id',
//         label: 'name',
//       },
//     }),
//     LayoutBuilder.horizontal<Lema>().addControls(
//       ControlBuilder.properties('grammatical'),
//       ControlBuilder.properties('comparative'),
//       ControlBuilder.properties('superlative'),
//       ControlBuilder.properties('participle'),
//     ),
//   )
//   .build();
//
// const tableSchema = TableBuilder.init<Lema>()
//   .addControls(
//     TextCellBuilder.properties('id'),
//     TextCellBuilder.properties('word'),
//     TextCellBuilder.properties('speech').key('name').setSortId('speech.name'),
//   )
//   .build();
//
// const filterSchema = LayoutBuilder.vertical<Lema>()
//   .addControls(ControlBuilder.properties('word'))
//   .build();
//
// const dtoSchema = LemaSchema.pick({
//   word: true,
//   link: true,
//   grammatical: true,
//   comparative: true,
//   superlative: true,
//   participle: true,
// }).extend({ speech: SpeechSchema.extend({ id: z.string().optional() }) });
//
// export const LemaFormSchema = createSchema({
//   uiSchema,
//   dtoSchema,
//   filterSchema,
//   jsonSchema: LemaForm,
//   tableSchema,
//   uri: '/api/lema',
// });
