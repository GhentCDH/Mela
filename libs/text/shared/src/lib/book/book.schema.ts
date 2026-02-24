import { z } from 'zod';

import { ControlBuilder, createSchema, LayoutBuilder, TableBuilder, TextCellBuilder } from '@ghentcdh/json-forms-core';

import type { Book, BookWithRelations, Chapter } from '@mela/generated-types';
import { AuthorSchema, BookSchema, ChapterSchema } from '@mela/generated-types';

import { AuthorFormSchema } from '../author/author.schema';

const detailStep = LayoutBuilder.horizontal<BookWithRelations>().addControls(
  ControlBuilder.properties('name'),
  ControlBuilder.asObject('author').autocomplete({
    uri: `${AuthorFormSchema.schema.uri}?filter=name:`,
    field: {
      id: 'id',
      label: 'name',
    },
  }),
  ControlBuilder.properties('year').width('sm'),
);

const chapterStep = ControlBuilder.properties('chapter')
  .detail(
    LayoutBuilder.horizontal<Chapter>().addControls(
      ControlBuilder.properties('chapter_number').width('xs'),
      ControlBuilder.properties('name').width('lg'),
    ),
  )
  .addAction({ type: 'edit', idField: 'id' });

const uiSchema = LayoutBuilder.vertical()
  .addControls(detailStep, chapterStep)
  .build();

const tableSchema = TableBuilder.init<Book>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
    TextCellBuilder.properties('year'),
    TextCellBuilder.properties('author').key('name').setSortId('author.name'),
  )
  .build();

const filterSchema = LayoutBuilder.horizontal<Book>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const dtoSchema = BookSchema.pick({
  name: true,
  year: true,
})
  .extend({
    author: AuthorSchema.omit({ created_at: true, updated_at: true }).extend({
      id: z.string().optional(),
    }),
    chapter: z
      .array(
        ChapterSchema.pick({ name: true, chapter_number: true }).extend({
          id: z.string().optional(),
          chapter_order: z.number().nullish().optional(),
        }),
      )
      .min(1),
  })
  .transform((value) => {
    return {
      ...value,
      chapter: value.chapter.map((ch, index) => ({
        ...ch,
        chapter_order: index,
      })),
    };
  });

export type CreateBook = z.infer<typeof dtoSchema>;

export const BookFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  tableSchema,
  uri: '/book',
  schema: BookSchema,
  modalSize: 'lg',
});
