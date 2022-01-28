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

describe("POST /register", () => {
  test("can register a user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "mario", password: "1234" });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe("mario");
  });
  test("returns 401 and message if username exists", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "laysha", password: "1234" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/username taken/);
  });
});

describe("POST /login", () => {
  test("User can login with correct credentials", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "laysha", password: "1234" });
    expect(res.body.message).toMatch(/welcome, laysha/);
  });
  test("respond with message on invalid credential", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "layshaaa", password: "1234" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid credentials/);
  });
  test("respond with message on missing username or password", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "layshaaa" });
    expect(res.status).toBe(422);
    expect(res.body.message).toMatch(/username and password required/);
  });
});

describe("GET /jokes", () => {
  test("returns all jokes", async () => {
    let res = await request(server)
      .post("/api/auth/login")
      .send({ username: "laysha", password: "1234" });
    res = await request(server)
      .get("/api/jokes")
      .set("Authorization", res.body.token);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject([
      {
        id: "0189hNRf2g",
        joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.",
      },
      {
        id: "08EQZ8EQukb",
        joke: "Did you hear about the guy whose whole left side was cut off? He's all right now.",
      },
      {
        id: "08xHQCdx5Ed",
        joke: "Why didn’t the skeleton cross the road? Because he had no guts.",
      },
    ]);
  });
});
