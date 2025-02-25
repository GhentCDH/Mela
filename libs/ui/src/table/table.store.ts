import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { extractFilters, RequestSchema } from '@ghentcdh/json-forms/core';

type RequestData = any;

// TODO add sorting

export const useTableStore = (name) =>
  defineStore(`ghentCDH_table_form_${name}`, () => {
    const route = useRoute();
    const router = useRouter();
    const httpRequest = useHttpRequest();

    const requestData = ref<RequestData>(RequestSchema.parse(route.query));

    const reload = ref(Date.now());
    const loading = ref(true);

    const uri = ref<string>('');

    const data = computedAsync(async () => {
      // Don't remove to listen on reload!
      const r = reload.value;

      if (!uri.value) return null;

      loading.value = true;

      if (requestData.value.page < 1) {
        requestData.value.page = 1;
      }

      const response = await httpRequest
        .get<any>(uri.value, {
          queryParams: requestData.value,
        })
        .catch((error) => {
          console.error(error);
          // TODO snackbar error
          return { data: [], request: { totalPages: 1, page: 1 } };
        })
        .finally(() => (loading.value = false));

      if (response.request.totalPages < response.request.page) {
        updateRequest({ page: response.request.totalPages });
      }
      return response;
    });

    const tableData = computed(() => {
      const d = data.value;
      return loading?.value ? [] : (d?.data ?? []);
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
      tableData,
      sortDirection,
      sortColumn,
      filters,
      loading,
      init,
      sort,
      reload: reloadFn,
      updatePage: (page: number) => updateRequest({ page }),
      updateFilters,
    };
  })();
