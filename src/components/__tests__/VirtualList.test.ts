import { describe, test, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import VirtualList from "../VirtualList.vue";

type ComponentProp = Partial<InstanceType<typeof VirtualList>["$props"]>;

type CreateComponentOptions = {
  props?: ComponentProp;
};

describe("VirtualList", () => {
  const defaultItems = [{ id: 1 }, { id: 2 }];
  const createComponent = (options?: CreateComponentOptions) =>
    shallowMount(VirtualList, {
      props: {
        items: defaultItems,
        ...options?.props,
      },
    });

  test("Component should mount", () => {
    const component = shallowMount(VirtualList);

    expect(!!component).toBe(true);
  });

  describe("Different tags render", () => {
    test("Should have render default parent tag 'div' with class of 'virtual-list'", () => {
      const component = createComponent();

      expect(component.find("div").classes()).toContain("virtual-list");
    });

    test("Should have render default parent tag 'ul' with class of 'virtual-list'", () => {
      const component = createComponent({ props: { tag: "ul" } });

      expect(component.find("ul").classes()).toContain("virtual-list");
    });
  });

  describe("Render items", () => {
    test("Default items slot with amount of passed items", () => {
      const component = createComponent();

      expect(component.findAll(".virtual-list__item").length).toBe(
        defaultItems.length
      );
    });
  });
});
