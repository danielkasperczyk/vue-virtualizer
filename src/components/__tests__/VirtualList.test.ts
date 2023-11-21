import { describe, test, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import VirtualList from "../VirtualList.vue";

describe("VirtualList", () => {
  test("Component should mount", () => {
    const component = shallowMount(VirtualList);

    expect(!!component).toBe(true);
  });

  describe("Different tags render", () => {
    test("Should have render default parent tag 'div' with class of 'virtual-list'", () => {
      const items = ["123", "456"];
      const component = shallowMount(VirtualList, {
        props: {
          items,
        },
      });

      expect(component.find("div").classes()).toContain("virtual-list");
    });

    test("Should have render default parent tag 'ul' with class of 'virtual-list'", () => {
      const items = ["123", "456"];
      const component = shallowMount(VirtualList, {
        props: {
          items,
          tag: "ul",
        },
      });

      expect(component.find("ul").classes()).toContain("virtual-list");
    });
  });
});
