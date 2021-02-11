import { newE2EPage } from "@stencil/core/testing";

describe("cc-button", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const element = await page.find("cc-button");
    expect(element).toHaveClass("hydrated");
  });

  it("renders default button", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );
    const textElem = await page.find(
      "cc-button [data-testid='cc-button__text']"
    );

    expect(btnElem.tagName).toBe("BUTTON");
    expect(btnElem).toBeTruthy();
    expect(textElem).toBeTruthy();
  });

  it("renders 'a' tag when use 'href' prop", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");

    const component = await page.find("cc-button");
    let btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );

    expect(btnElem.tagName).toBe("BUTTON");

    component.setProperty("href", "http://google.com");
    await page.waitForChanges();
    btnElem = await page.find("cc-button [data-testid='cc-button__element']");

    expect(btnElem.tagName).toBe("A");
    expect(btnElem.getAttribute("href")).toBe("http://google.com");
  });

  it("should use 'target' when use 'href' prop", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");

    const component = await page.find("cc-button");

    component.setProperty("href", "http://google.com");
    component.setProperty("target", "_blank");
    await page.waitForChanges();

    const btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );

    expect(btnElem.tagName).toBe("A");
    expect(btnElem.getAttribute("target")).toBe("_blank");
  });

  it("should change colors", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");

    const component = await page.find("cc-button");

    expect(component).not.toHaveClass("button--secondary");
    component.setProperty("color", "secondary");
    await page.waitForChanges();
    expect(component).toHaveClass("button--secondary");
  });

  it("should expand", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");

    const component = await page.find("cc-button");

    expect(component).not.toHaveClass("button--block");
    component.setProperty("expand", true);
    await page.waitForChanges();
    expect(component).toHaveClass("button--block");
  });

  it("should disabled", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const component = await page.find("cc-button");

    const btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );

    expect(btnElem).not.toHaveClass("button--disabled");
    expect(btnElem.getAttribute("disabled")).toBe(null);
    component.setProperty("disabled", true);
    await page.waitForChanges();
    expect(btnElem.getAttribute("disabled")).toBe("");
    expect(btnElem).toHaveClass("button--disabled");
  });

  it("should change fill", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const component = await page.find("cc-button");

    const btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );

    component.setProperty("fill", "outline");
    await page.waitForChanges();
    expect(btnElem).toHaveClass("button--outline");

    component.setProperty("fill", "clear");
    await page.waitForChanges();
    expect(btnElem).toHaveClass("button--clear");
  });

  it("should change sizes", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const component = await page.find("cc-button");

    const btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );

    component.setProperty("size", "md");
    await page.waitForChanges();
    expect(btnElem).toHaveClass("button--md");

    component.setProperty("size", "sm");
    await page.waitForChanges();
    expect(btnElem).toHaveClass("button--sm");
  });

  it("should add glow", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const component = await page.find("cc-button");

    const btnElem = await page.find(
      "cc-button [data-testid='cc-button__element']"
    );

    component.setProperty("glow", true);
    await page.waitForChanges();
    expect(btnElem).toHaveClass("button--glow");
  });

  it("should add icon", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button></cc-button>");
    const component = await page.find("cc-button");

    let icon = await page.find("cc-button cc-icon");

    expect(icon).toBeFalsy();
    component.setProperty("iconName", "chest");
    await page.waitForChanges();
    icon = await page.find("cc-button cc-icon");
    expect(icon).toBeTruthy();
  });

  it("should hide text when is icon only", async () => {
    const page = await newE2EPage();

    await page.setContent("<cc-button>my button</cc-button>");
    const component = await page.find("cc-button");

    let icon = await page.find("cc-button cc-icon");
    let text = await page.find("cc-button [data-testid='cc-button__text']");

    expect(icon).toBeFalsy();
    expect(text).toEqualText('my button');

    component.setProperty("iconName", "chest");
    component.setProperty("iconOnly", true);

    await page.waitForChanges();

    icon = await page.find("cc-button cc-icon");
    text = await page.find("cc-button [data-testid='cc-button__text']");

    expect(icon).toBeTruthy();
    expect(text).toHaveClass('hidden');
  });
});
