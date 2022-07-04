// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require("./reload")

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have welcome screen", async () => {
    await expect(element(by.id("WelcomeScreen"))).toBeVisible()
  })

  it("should go to next screen after tap", async () => {
    await element(by.id("next-screen-button")).tap();
    await expect(element(by.id("DemoScreen"))).toBeVisible()
  })

  it("should go to Demo List screen after tap", async () => {
    await element(by.id("demo-list-button").and(by.text('Demo List')));
    await element(by.id("demo-list-button")).tap();
    await expect(element(by.id("DemoListScreen"))).toBeVisible()
  })

  it("should scroll to bottom and top", async () => {
    await waitFor(element(by.id('demo-flatlist'))).toBeVisible().whileElement(by.id('item-20')).scroll(200, 'down');
    await element(by.id('demo-flatlist')).scrollTo('bottom');
    await element(by.id('demo-flatlist')).scrollTo('top');

  })
})
