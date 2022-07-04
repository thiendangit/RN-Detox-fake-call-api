import { CharacterApi } from "../app/services/api/character-api"
import { Character } from "../app/models/character/character"
import { Environment } from "../app/models/environment"

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}

test("can be created", () => {
  const mockCallback = jest.fn(x => 42 + x)
  forEach([0, 1], mockCallback)

// The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2)

// The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0)

// The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1)

// The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBeLessThan(43)
})

test("get Characters", async () => {
  const env = new Environment()
  await env.setup()
  const characterApi = new CharacterApi(env.api)
  const result = await characterApi.getCharacters() as { kind: "ok"; characters: Character[] }
  expect(result.kind).toEqual("ok")
  expect(result?.kind).not.toBeNull()
  expect(result.characters).not.toBeNull()
})
