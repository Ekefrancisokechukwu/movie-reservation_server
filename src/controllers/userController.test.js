const request = require("supertest");
const app = require("../app");
const { closeDB } = require("../config/db");

describe("GET /users", () => {
  test("should fetch all users", async () => {
    const res = await request(app).get("/api/v1/user");
    expect(res.status).toBe(200);
  });
});

afterAll(async () => {
  await closeDB();
});
