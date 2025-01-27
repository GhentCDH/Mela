export const OwnerWithRelationsFormDetail = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
    name: { type: 'string' },
    firstname: { type: 'string' },
    emails: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          email: { type: 'string' },
        },
        required: ['id', 'createdAt', 'email'],
        additionalProperties: false,
      },
    },
  },
  required: [],
  additionalProperties: false,
};
