import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import {
  RequestDtoNoOffset,
  RequestSchema,
  ResponseUnknown,
  extractFilters,
} from '@ghentcdh/tools/form';

type RequestData = RequestDtoNoOffset;

// TODO add sorting

export const useTableStore = (name) =>
  defineStore(`ghentCDH_table_form_${name}`, () => {
    const route = useRoute();
    const router = useRouter();

    const requestData = ref<RequestData>(RequestSchema.parse(route.query));

    console.log('requestData', route.query);
    console.log(RequestSchema.parse(route.query));

    const httpStore = useHttpStore();
    const reload = ref(Date.now());

    const uri = ref<string>('');

    const data = computedAsync(async () => {
      // Don't remove to listen on reload!
      const r = reload.value;

      if (!uri.value) return null;

      if (requestData.value.page < 1) {
        requestData.value.page = 1;
      }

      const response = await httpStore.get<ResponseUnknown>(uri.value, {
        queryParams: requestData.value,
      });

      if (response.request.totalPages < response.request.page) {
        updateRequest({ page: response.request.totalPages });
      }

      return response;
    });

    const reloadFn = () => {
      reload.value = Date.now();
    };

    const init = (url: string) => {
      uri.value = url;
    };

    const updateRequest = (data: Partial<RequestData>) => {
      requestData.value = { ...requestData.value, ...data };

      router.replace({
        query: {
          ...route.query,
          ...requestData.value,
        },
      });
    };

    const sort = (id: string) => {
      const sortDir =
        requestData.value.sort === id && requestData.value.sortDir === 'asc'
          ? 'desc'
          : 'asc';
      updateRequest({ sort: id, sortDir });
    };

    const updateFilters = (filters: Record<string, any>) => {
      console.log('__filters __', filters);
      const filter: string[] = [];

      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;

        // TODO decide what is the operator
        const operator = value?.operator || 'contains';
        filter.push(`${key}:${value}:${operator}`);
      });

      updateRequest({ filter });
    };

    const sortDirection = computed(() => requestData.value.sortDir);
    const sortColumn = computed(() => requestData.value.sort);
    const filters = computed(() => extractFilters(requestData.value.filter));

    return {
      data,
      sortDirection,
      sortColumn,
      filters,
      init,
      sort,
      reload: reloadFn,
      updatePage: (page: number) => updateRequest({ page }),
      updateFilters,
    };
  })();
