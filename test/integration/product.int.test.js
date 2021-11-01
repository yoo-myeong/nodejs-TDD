const request = require("supertest");
const app = require("../../server.js");
const newProduct = require("../data/new-product.json");

it("POST /product", async () => {
  const response = await request(app).post("/product").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it("sholud return 500 on POST /product", async () => {
  const response = await request(app).post("/product").send({ name: "phone" });
  expect(response.statusCode).toBe(500);
  console.log("responsebody", response.body);
  expect(response.body).toStrictEqual({ msg: "server error" });
});
