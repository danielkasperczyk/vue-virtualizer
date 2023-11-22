import { computed } from "vue";

export type UseVirtualListProps = {
  height: number | string;
};

export const useVirtualList = (props: UseVirtualListProps) => {
  const virtualListHeight = computed(() =>
    typeof props.height === "string" ? props.height : `${props.height}px`
  );

  return { virtualListHeight };
};
