import { describe, test, expect } from "vitest";
import {
  UseVirtualListProps,
  useVirtualList,
} from "@/src/composables/useVirtualList";
import { computed } from "vue";

const defaultProps = (): UseVirtualListProps => ({
  height: 200,
  target: null,
  itemHeight: 50,
  items: [],
  currentVerticalPosition: computed(() => 0),
});

describe("useVirtualList", () => {
  test("Virtual list height", () => {
    const { boundedVirtualListHeight } = useVirtualList({
      ...defaultProps(),
      height: "auto",
    });

    expect(boundedVirtualListHeight.value).toBe("auto");
  });

  test("Virtual list height in pixels", () => {
    const { boundedVirtualListHeight } = useVirtualList(defaultProps());
    expect(boundedVirtualListHeight.value).toBe("200px");
  });
});
