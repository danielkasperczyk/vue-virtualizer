import { describe, test, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import VirtualList from "../VirtualList.vue";

describe("VirtualList", () => {
  test("Component should mount", () => {
    const component = shallowMount(VirtualList);

    expect(!!component).toBe(true);
  });
});
