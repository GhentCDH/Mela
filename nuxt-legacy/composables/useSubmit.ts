import { ref } from "vue";

export const useSubmit = <T extends Ref>(
  dataRef: T,
  method: "POST" | "PUT",
  url: string,
  onError: Function,
  onSuccess: Function,
) => {
  const pending = ref(false);
  const error = ref();
  const onSubmit = async () => {
    console.log("submitting");
    pending.value = true;
    try {
      const { headers } = await useAuthorizationHeaders();
      dataRef.value = await $fetch<T>(url, {
        method,
        headers: headers,
        body: dataRef.value,
      });
      onSuccess();
    } catch (fetchError) {
      error.value = fetchError;
      onError(fetchError);
    } finally {
      pending.value = false;
    }
  };
  return { onSubmit, pending, error };
};
