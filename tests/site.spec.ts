import { test, expect } from "@playwright/test";

test("all public pages render, images load, metadata updates, and no console errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of [
    "/",
    "/services",
    "/solutions",
    "/cases",
    "/about",
    "/contact",
    "/cases/commerce-assistant",
    "/cases/local-booking",
    "/cases/team-knowledge",
    "/cases/sales-workflow",
    "/cases/content-copilot",
    "/cases/document-extraction",
    "/cases/unknown",
    "/missing",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/AI Studio/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (e: HTMLImageElement) => e.complete && e.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("industry filters, URL state, detail navigation and empty state", async ({
  page,
}) => {
  await page.goto("/cases");
  await expect(page.locator(".case-card")).toHaveCount(6);
  for (const [label, count] of [
    ["电商零售", 2],
    ["餐饮本地生活", 1],
    ["企业办公", 2],
    ["专业服务", 1],
  ] as const) {
    const filter = page.getByRole("button", { name: label, exact: true });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".case-card")).toHaveCount(count);
  }
  await page.reload();
  await expect(page.locator(".case-card")).toHaveCount(1);
  await page.locator(".case-card h3 a").click();
  await expect(page).toHaveURL(/document-extraction/);
  await expect(page.getByRole("heading", { name: "方案概述" })).toBeVisible();
  await page.getByRole("link", { name: "返回案例列表", exact: true }).click();
  await expect(page.locator(".case-card")).toHaveCount(6);
  await page.goto("/cases?category=unknown");
  await expect(
    page.getByRole("heading", { name: "这个分类的场景还在探索中" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "查看全部案例" }).click();
  await expect(page.locator(".case-card")).toHaveCount(6);
});

test("responsive pages have no horizontal overflow", async ({ page }) => {
  for (const width of [320, 360, 375, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/services",
      "/solutions",
      "/cases",
      "/about",
      "/contact",
      "/cases/commerce-assistant",
      "/cases/local-booking",
      "/cases/team-knowledge",
      "/cases/sales-workflow",
      "/cases/content-copilot",
      "/cases/document-extraction",
      "/missing",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${width}px ${route}`,
      ).toBe(true);
    }
  }
});

test("mobile menu closes on link, traps keyboard focus and handles Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "打开菜单" }).click();
  const nav = page.getByRole("navigation", { name: "移动导航" });
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "免费咨询" }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "关闭菜单" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toHaveCount(0);
  await expect(page.getByRole("button", { name: "打开菜单" })).toBeFocused();
  await page.getByRole("button", { name: "打开菜单" }).click();
  await page
    .getByRole("navigation", { name: "移动导航" })
    .getByRole("link", { name: "案例展示" })
    .click();
  await expect(nav).toHaveCount(0);
  await expect(page).toHaveURL("/cases");
});

test("contact copy success and failure provide truthful feedback", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page.getByRole("button", { name: "复制电子邮箱" }).click();
  await expect(page.getByRole("status")).toContainText("电子邮箱已复制");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "hello@example.com",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
      configurable: true,
    }),
  );
  await page.getByRole("button", { name: "复制微信咨询" }).click();
  await expect(page.getByRole("status")).toContainText("请手动选择并复制");
});

test("route changes reset scroll and service anchors work", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".service-2").click();
  await expect(page).toHaveURL("/services#knowledge");
  await expect(page.locator("#knowledge h2")).toBeInViewport();
  await page
    .getByRole("navigation", { name: "主导航", exact: true })
    .getByRole("link", { name: "案例展示" })
    .click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test.describe("H5 touch navigation", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test("touch filters and same-page menu links remain usable", async ({
    page,
  }) => {
    await page.goto("/cases");
    for (const button of await page.locator(".filters button").all()) {
      const box = await button.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    await page.getByRole("button", { name: "专业服务", exact: true }).tap();
    await expect(page.locator(".case-card")).toHaveCount(1);
    await page.getByRole("button", { name: "打开菜单" }).tap();
    await page
      .getByRole("navigation", { name: "移动导航" })
      .getByRole("link", { name: "案例展示" })
      .tap();
    await expect(
      page.getByRole("navigation", { name: "移动导航" }),
    ).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await page
      .locator(".case-card")
      .first()
      .getByRole("link", { name: /查看详情/ })
      .tap();
    await expect(page.locator(".detail-header")).toBeVisible();
  });

  test("landscape drawer scrolls and every page fits the screen", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    for (const route of [
      "/",
      "/services",
      "/solutions",
      "/cases",
      "/cases/team-knowledge",
      "/about",
      "/contact",
      "/missing",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      await expect(
        page.getByRole("button", { name: "打开菜单" }),
      ).toBeVisible();
    }
    await page.getByRole("button", { name: "打开菜单" }).tap();
    const nav = page.getByRole("navigation", { name: "移动导航" });
    await nav.getByRole("link", { name: "免费咨询" }).tap();
    await expect(nav).toHaveCount(0);
    await expect(page).toHaveURL("/contact");
  });
});
