import type { Meta, StoryFn } from '@storybook/vue3';

import {
  CategoryBuilder,
  ControlBuilder,
  LayoutBuilder,
} from '@ghentcdh/tools/form';

import FormComponent from './form.component.vue';

export default {
  title: 'Components/Form/stepper',
  component: FormComponent,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { FormComponent },
  setup() {
    return { args };
  },
  template: `<div>
              <FormComponent v-bind="args"
              v-model="args.formData" />
              <pre>{{args.formData}}</pre>
            </div>`,
});

export const Default = Template.bind({});
Default.args = {
  id: 'default-form',
  formData: {},
  schema: {
    type: 'object',
    properties: {
      // examples
      step1Control: {
        type: 'string',
      },
      step1ControlInt: {
        type: 'integer',
      },
      step1ControlNumber: {
        type: 'number',
      },
      step1ControlBool: {
        type: 'boolean',
      },
      step2ControlMarkdown: {
        type: 'string',
      },
      step3ControlMarkdown: {
        type: 'string',
      },
      smallControl: {
        type: 'number',
      },
    },
    required: ['step1Control'],
  },
  uischema: LayoutBuilder.stepper(true)
    .addControls(
      CategoryBuilder.label('step 1').addControls(
        LayoutBuilder.vertical().addControls(
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope('#/properties/step1Control'),
          ),
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope('#/properties/smallControl').width('small'),
            ControlBuilder.scope('#/properties/smallControl').width('small'),
          ),
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope('#/properties/step1ControlInt'),
            ControlBuilder.scope('#/properties/step1ControlNumber'),
          ),
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope('#/properties/step1ControlBool'),
            ControlBuilder.scope('#/properties/step1ControlBool'),
          ),
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope(
              '#/properties/step2ControlMarkdown',
            ).markdown(),
            ControlBuilder.scope(
              '#/properties/step2ControlMarkdown',
            ).markdown(),
          ),
        ),
      ),
      CategoryBuilder.label('step 2').addControls(
        LayoutBuilder.vertical().addControls(
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope(
              '#/properties/step2ControlMarkdown',
            ).markdown(),
            ControlBuilder.scope(
              '#/properties/step2ControlMarkdown',
            ).markdown(),
          ),
        ),
      ),
      CategoryBuilder.label('step 3').addControls(
        LayoutBuilder.vertical().addControls(
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope(
              '#/properties/step3ControlMarkdown',
            ).markdown(),
          ),
        ),
      ),
    )
    .build(),
};
