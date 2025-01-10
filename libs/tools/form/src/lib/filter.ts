export const Operator = ['contains'] as const;
export type OperatorType = (typeof Operator)[number];

export type Filter = {
  key: string;
  value: any;
  operator: OperatorType;
  label?: string;
};

const getFilterValues = (filter: string): Filter => {
  const [key, value, op] = filter.split(':') as string[];

  const operator: OperatorType = Operator.includes(op as any)
    ? (op as OperatorType)
    : 'contains';

  return { key, value, operator };
};

export const buildFilter = (filters: string[]) => {
  const filter: Record<string, any> = {};

  filters.forEach((f) => {
    const { key, value, operator } = getFilterValues(f);

    if (!key) return;

    filter[key] = {
      // TODO check if operator is possible
      [operator || 'contains']: value.toLowerCase(),
    };
  });

  return filter;
};

export const extractFilters = (filters: string[]) => {
  const result: Filter[] = [];

  filters.forEach((f) => {
    const { key, value, operator } = getFilterValues(f);

    if (!key) return;

    const label = key;

    // TODO if in operator it should be a list

    result.push({ label, key, value, operator });
  });

  return result;
};
