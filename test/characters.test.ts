import { CharacterApi } from "../app/services/api/character-api"
import { Character } from "../app/models/character/character"
import { Environment } from "../app/models/environment"
import MockAdapter from "axios-mock-adapter"

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

test("Mock get characters", async () => {
  const env = new Environment()
  await env.setup()
  const mock = new MockAdapter((env.api.apisauce).axiosInstance)
  // given
  const users = {
      results : [
        {
          "id": 1,
          "name": "Rick Sanchez",
          "status": "Alive",
          "species": "Human",
          "type": "",
          "gender": "Male",
          "origin": { "name": "Earth (C-137)", "url": "https://rickandmortyapi.com/api/location/1" },
          "location": {
            "name": "Earth (Replacement Dimension)",
            "url": "https://rickandmortyapi.com/api/location/20"
          },
          "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            ],
          "url": "https://rickandmortyapi.com/api/character/1",
          "created": "2017-11-04T18:48:46.250Z"
        },
        {
          "id": 2,
          "name": "Rick Sanchez",
          "status": "Alive",
          "species": "Human",
          "type": "",
          "gender": "Male",
          "origin": { "name": "Earth (C-137)", "url": "https://rickandmortyapi.com/api/location/1" },
          "location": {
            "name": "Earth (Replacement Dimension)",
            "url": "https://rickandmortyapi.com/api/location/20"
          },
          "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
          ],
          "url": "https://rickandmortyapi.com/api/character/1",
          "created": "2017-11-04T18:48:46.250Z"
        }
      ]
  };
  await mock.onGet('https://raw.githubusercontent.com/infinitered/ignite/master/data/rick-and-morty.json').reply(200, users);
  const characterApi = new CharacterApi(env.api)
  const charactersResult = await characterApi.getCharacters() as { kind: "ok"; characters: Character[] }
  expect(charactersResult.kind).toEqual("ok")
  expect(charactersResult?.kind).not.toBeNull()
  expect(charactersResult.characters).not.toBeNull()
})
