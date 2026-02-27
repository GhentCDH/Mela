import { z } from 'zod';

import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';

import {
  AuthorSchema,
  Section,
  Work,
  WorkSchema,
  WorkWithRelations,
} from '@mela/generated-types';

import { AuthorFormSchema } from '../author/author.schema';

const detailStep = LayoutBuilder.horizontal<WorkWithRelations>().addControls(
  ControlBuilder.properties('title').width('xl'),
  ControlBuilder.asObject('author')
    .autocomplete({
      uri: `${AuthorFormSchema.schema.uri}?filter=name:`,
      field: {
        id: 'id',
        label: 'name',
      },
    })
    .width('xl'),
  ControlBuilder.properties('year').width('sm'),
);

const sectionStep = ControlBuilder.properties('section')
  .detail(
    LayoutBuilder.horizontal<Section>().addControls(
      ControlBuilder.properties('section_number').width('xs'),
      ControlBuilder.properties('title').width('lg'),
    ),
  )
  .addAction({ type: 'edit', idField: 'id' });

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    detailStep,
    //  sectionStep
  )
  .build();

const tableSchema = TableBuilder.init<Work>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('title'),
    TextCellBuilder.properties('year'),
    TextCellBuilder.properties('author').key('name').setSortId('author.name'),
  )
  .build();

const filterSchema = LayoutBuilder.horizontal<Work>()
  .addControls(ControlBuilder.properties('title'))
  .build();

const dtoSchema = WorkSchema.pick({
  title: true,
  year: true,
}).extend({
  id: z.string().optional(),
  author: AuthorSchema.omit({ created_at: true, updated_at: true }).extend({
    id: z.string().optional(),
  }),
  // section: z
  //   .array(
  //     SectionSchema.pick({ title: true, section_number: true }).extend({
  //       id: z.string().optional(),
  //       section_order: z.number().nullish().optional(),
  //     }),
  //   )
  //   .min(1),
});
// .transform((value) => {
//   return {
//     ...value,
//     section: value.section.map((ch, index) => ({
//       ...ch,
//       section_order: index,
//     })),
//   };
// });

export type CreateWork = z.infer<typeof dtoSchema>;

export const WorkFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  tableSchema,
  uri: '/work',
  schema: WorkSchema,
  modalSize: 'lg',
});
