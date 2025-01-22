import { isArray } from 'lodash-es';
import { z } from 'zod';

export const PositiveRequestNumber = () =>
  z.coerce.number().int().positive().nonnegative();
export const StringOrArray = () =>
  z
    .string()
    .or(z.array(z.string()))
    .transform((val) => {
      if (isArray(val)) return val;

      return [val];
    });
