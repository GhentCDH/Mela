export const usePageLoaded = () => {
  const pageLoaded = ref(false);

  onMounted(() => {
    pageLoaded.value = true;
  });

  return { pageLoaded };
};
