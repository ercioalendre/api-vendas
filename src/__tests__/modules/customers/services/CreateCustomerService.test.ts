import "reflect-metadata";
import request from "supertest";
import app from "@shared/http/app";
import connection from "@tests/TypeORM.connection";

// beforeAll(async () => {
//   await connection.create();
// });

// afterAll(async () => {
//   await connection.close();
// });

// beforeEach(async () => {
//   // await connection.clear();
// });

describe("Create customer service tests", () => {
  it("should create a new customer", async () => {
    const createNewUser = await request(app).post("/users").send({
      name: "No Reply",
      email: "no-reply@ercioalendre.one",
      password: "Str0ngP@sswo4d!",
    });
    expect(createNewUser.status).toBe(200);
  });
  // it("responds with json", function (done) {
  //   request(app)
  //     .post("/users")
  //     .send({
  //       name: "No Reply",
  //       email: "no-reply@ercioalendre.one",
  //       password: "Str0ngP@sswo4d!",
  //     })
  //     .set("Accept", "application/json")
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });
});
