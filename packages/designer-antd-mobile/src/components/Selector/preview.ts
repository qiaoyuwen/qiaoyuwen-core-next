import { Selector as FormilySelector } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createBehavior, createResource } from '@qiaoyuwen-core-next/designer-core';
import { DnFC } from '@qiaoyuwen-core-next/designer-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Selector: DnFC<React.ComponentProps<typeof FormilySelector>> = FormilySelector;

Selector.Behavior = createBehavior({
  name: 'Selector',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Selector',
  designerProps: {
    propsSchema: createFieldSchema({
      component: AllSchemas.Selector,
      defaultValueInputType: 'EXPRESSION',
    }),
  },
  designerLocales: AllLocales.Selector,
});

Selector.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Selector',
        'x-decorator': 'FormItem',
        'x-component': 'Selector',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
          { label: '选项3', value: 3 },
        ],
      },
    },
  ],
});
