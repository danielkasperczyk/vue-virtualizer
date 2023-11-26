import {
  MaybeRefOrGetter,
  computed,
  isRef,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

export const useScroll = (
  target: MaybeRefOrGetter<HTMLElement | undefined>
) => {
  const internalY = ref(0);

  const handleScroll = (e: Event) => {
    if (!e.target) return;
    const target = e.target as HTMLElement;

    internalY.value = Math.round(target.scrollTop);
  };

  onMounted(() => {
    if (target && isRef(target))
      target.value?.addEventListener("scroll", handleScroll);
  });
  onBeforeUnmount(() => {
    if (target && isRef(target))
      target.value?.removeEventListener("scroll", handleScroll);
  });

  return {
    y: computed(() => internalY.value),
  };
};
