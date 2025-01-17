import { SortDir } from './request.model';

export const Operator = ['contains', 'equals'] as const;
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

const buildFilterKey = (keys: string[], filterObj: any) => {
  if (keys.length === 1) {
    return { key: keys[0], filterObj };
  }

  const buildKey = keys.pop() as string;

  return buildFilterKey(keys, { [buildKey]: filterObj });
};

export const buildSort = (key: string, sortDir: SortDir) => {
  return buildSortKey(key.split('.'), sortDir);
};

const buildSortKey = (keys: string[], sortDir: any) => {
  if (keys.length === 1) {
    return { [keys[0]]: sortDir };
  }

  const buildKey = keys.pop() as string;

  return buildSortKey(keys, { [buildKey]: sortDir });
};

export const buildFilter = (filters: string[]) => {
  const filter: Record<string, any> = {};

  filters.forEach((f) => {
    const { key, value, operator } = getFilterValues(f);

    if (!key) return;

    const build = buildFilterKey(key.split('.'), {
      // TODO check if operator is possible
      [operator || 'contains']: value.toLowerCase(),
    });

    filter[build.key] = build.filterObj;
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
