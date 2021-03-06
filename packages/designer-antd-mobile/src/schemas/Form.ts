import { ISchema } from '@formily/react';

export const Form: ISchema = {
  type: 'object',
  properties: {
    layout: {
      type: 'string',
      enum: ['vertical', 'horizontal', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'vertical',
      },
    },
  },
};
