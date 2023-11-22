import { describe, test, expect } from "vitest";
import { useVirtualList } from "@/src/composables/useVirtualList";

describe("useVirtualList", () => {
  test("Virtual list height", () => {
    const { virtualListHeight } = useVirtualList({ height: "auto" });

    expect(virtualListHeight.value).toBe("auto");
  });

  test("Virtual list height in pixels", () => {
    const { virtualListHeight } = useVirtualList({ height: 200 });

    expect(virtualListHeight.value).toBe("200px");
  });
});
