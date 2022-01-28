// Write your tests here
const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");
const Users = require("./users/users-model");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("POST /login", () => {
  test("returns a status 200 OK", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "laysha", password: "1234" });
    expect(res.body.message).toMatch(/welcome, laysha/);
  });
});
