import { newE2EPage } from "@stencil/core/testing";

describe("cc-icon", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-icon></cc-icon>");
    const component = await page.find("cc-icon");

    component.setProperty("name", "chest");
    await page.waitForChanges();
    const element = await page.find("cc-icon >>> [data-testid='cc-icon__svg']");

    expect(component).toHaveClass("hydrated");
    expect(element).toBeTruthy();
  });

  it("should change size", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-icon></cc-icon>");
    const component = await page.find("cc-icon");

    component.setProperty("name", "chest");
    await page.waitForChanges();

    const element = await page.find("cc-icon >>> [data-testid='cc-icon__svg']");
    expect(element.getAttribute("width")).not.toBe(50);
    expect(element.getAttribute("height")).not.toBe(50);

    component.setProperty("size", 50);
    await page.waitForChanges();

    expect(parseInt(element.getAttribute("width"))).toBe(50);
    expect(parseInt(element.getAttribute("height"))).toBe(50);
  });
});
