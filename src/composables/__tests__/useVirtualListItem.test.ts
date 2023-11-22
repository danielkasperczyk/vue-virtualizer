import { describe, expect, test } from "vitest";
import {
  useVirtualListItem,
  defaultItemProps,
} from "@/src/composables/useVirtualListItem";

describe("useVirtualListItem", () => {
  describe("Item height", () => {
    test("Set default height for a item", () => {
      const { boundedItemHeight } = useVirtualListItem(defaultItemProps());

      expect(boundedItemHeight.value).toBe("50px");
    });

    test("Set passed height for a item", () => {
      const { boundedItemHeight } = useVirtualListItem({
        ...defaultItemProps(),
        itemHeight: 150,
      });

      expect(boundedItemHeight.value).toBe("150px");
    });
  });

  describe("Set attributes to be bounded to item", () => {
    test("Bind props and item", () => {
      const { itemBinding } = useVirtualListItem(defaultItemProps());

      expect(itemBinding({ id: 1 })).toStrictEqual({
        item: { id: 1 },
        props: {
          class: "virtual-list__item",
        },
      });
    });
  });
});
