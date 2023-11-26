import { ComputedRef, MaybeRefOrGetter, computed, isRef } from "vue";
import { VirtualListItem } from "./useVirtualListItem";

export type UseVirtualListProps = {
  height: number | string;
  itemHeight: number;
  items: VirtualListItem[];
  target: MaybeRefOrGetter<HTMLElement | undefined | null>;
  currentVerticalPosition: ComputedRef<number>;
};

export const useVirtualList = (props: UseVirtualListProps) => {
  const boundedVirtualListHeight = computed(() =>
    typeof props.height === "string" ? props.height : `${props.height}px`
  );

  const height = computed(() => {
    if (!props.target || !isRef(props.target)) return 0;
    const rects = props.target.value?.getClientRects()?.item(0);
    return rects?.height || 0;
  });

  const startIndex = computed(() => {
    return Math.floor(props.currentVerticalPosition.value / props.itemHeight);
  });

  const maxItemsVisibleAtOnce = computed(() => {
    return Math.ceil(height.value / props.itemHeight);
  });

  const visibleItems = computed(() => {
    return props.items.slice(
      startIndex.value,
      startIndex.value + maxItemsVisibleAtOnce.value
    );
  });

  return { boundedVirtualListHeight, height, visibleItems, startIndex };
};
