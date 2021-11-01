const request = require("supertest");
const app = require("../../server.js");
const newProduct = require("../data/new-product.json");

let firstProduct;

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

it("GET /api/products", async () => {
  const response = await request(app).get("/product");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /product/:productId", async () => {
  const response = await request(app).get("/product/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("GET id doenst exist /product/:productId", async () => {
  const response = await request(app).get("/product/617a76c6e077fa341d1b120d");
  expect(response.statusCode).toBe(404);
});

it("PUT /product", async () => {
  const res = await request(app)
    .put("/product/" + firstProduct._id)
    .send({ name: "updated name", description: "updated desription" });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated name");
  expect(res.body.description).toBe("updated desription");
});

it("should return 404 on PUT /product", async () => {
  const res = await request(app)
    .put("/product" + "617a76c6e077fa341d1b120d")
    .send({ name: "updated name", description: "updated desription" });
  expect(res.statusCode).toBe(404);
});
