const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mockJsonConfig = require("../configurationfile/assignment-configuration.json");
const app = require("../index");

describe("POST /login", () => {
  it("should return a token when valid credentials are supplied", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "user1", password: "password1" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    const decodedToken = jwt.verify(response.body.token, "mysecretkey");
    expect(decodedToken.username).toBe("user1");
  });

  it("should return a 401 when invalid credentials are supplied", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "user1", password: "invalid" });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid username or password");
  });
});

describe("GET /config", () => {
  it("should return the configuration when a valid token is supplied", async () => {
    const token = jwt.sign({ username: "user1" }, "mysecretkey");
    const response = await request(app)
      .get("/config")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockJsonConfig);
  });

  it("should return a 401 when no token is supplied", async () => {
    const response = await request(app).get("/config");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Missing authorization header");
  });

  it("should return a 401 when an invalid token is supplied", async () => {
    const response = await request(app)
      .get("/config")
      .set("Authorization", "Bearer invalid");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid token");
  });

  it("should return a 401 when a token with an invalid scheme is supplied", async () => {
    const response = await request(app)
      .get("/config")
      .set("Authorization", "Basic user:password");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid authorization scheme");
  });
});
