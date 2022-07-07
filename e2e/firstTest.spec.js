// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

import { Api } from "../app/services/api"
import { CharacterApi } from "../app/services/api/character-api"
import MockAdapter from "axios-mock-adapter"

const { reloadApp } = require("./reload")

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have welcome screen", async () => {
    await expect(element(by.id("WelcomeScreen"))).toBeVisible()
  })

  it("should go to next screen after tap", async () => {
    await element(by.id("next-screen-button")).tap()
    await expect(element(by.id("DemoScreen"))).toBeVisible()
  })

  it("should go to Demo List screen after tap", async () => {
    await element(by.id("demo-list-button").and(by.text("Demo List")))
    await element(by.id("demo-list-button")).tap()
    await expect(element(by.id("DemoListScreen"))).toBeVisible()
  })

  it("should scroll to bottom and top", async () => {
    await waitFor(element(by.id("demo-flatlist"))).toBeVisible().whileElement(by.id("item-20")).scroll(200, "down")
    await element(by.id("demo-flatlist")).scrollTo("bottom")
    await element(by.id("demo-flatlist")).scrollTo("top")
  })

  it("should submit successfully", async () => {
    let api = new Api()
    api.setup()
    const mock = new MockAdapter((api.apisauce).axiosInstance)
    // given
    const response = {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    }
    await mock.onGet("https://jsonplaceholder.typicode.com/posts/1").reply(200, response)
    const characterApi = new CharacterApi(api)
    await characterApi.submitCharacter()
    await element(by.id("submit-character")).tap()
    await expect(element(by.id("DemoScreen"))).toBeVisible()
  })
})
