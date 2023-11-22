import { PropType, computed } from "vue";

export type VirtualListItem = Record<string, any> & { id: string | number };

type VirtualListItemTags = "div";
const supportedItemTags: VirtualListItemTags[] = ["div"];

type VirtualListItemProps = {
  itemTag: VirtualListItemTags;
  itemHeight: number;
};

export const virtualListItemProps = {
  itemTag: {
    type: String as PropType<VirtualListItemTags>,
    default: "div",
    validator: (tag: VirtualListItemTags) => supportedItemTags.includes(tag),
  },
  itemHeight: {
    type: Number,
    default: 50,
    validator: (height: number) => height >= 0,
  },
};

export const defaultItemProps = (): VirtualListItemProps => ({
  itemHeight: 50,
  itemTag: "div",
});

export const useVirtualListItem = (props: VirtualListItemProps) => {
  const boundedItemHeight = computed(() => `${props.itemHeight}px`);

  const itemBinding = (item: VirtualListItem) => {
    const props = {
      class: "virtual-list__item",
    };
    return {
      item,
      props,
    };
  };

  return { boundedItemHeight, itemBinding };
};
