const request = require('supertest');
const app = require('../app');
const ProductImg = require('../models/ProductImg');
require('../models')

let productId;
let token;

beforeAll(async () => {
  const credentials = {
    email: "martinez1234@test.com",
    password: "test"
  }
  res = await request(app).post('/api/v1/users/login').send(credentials)
  token = res.body.token
})

//POST
test("Post / should create a new category and return code 201", async () => {
  const newProduct = {
    "title": "tv",
    "description": "lorem30",
    "price": 230
  }
  const res = await request(app)
    .post("/api/v1/products")
    .set('Authorization', `Bearer ${token}`)
    .send(newProduct)
  productId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.title).toBe(newProduct.title)
})

//GET
test("GET / return code for the user should be 200", async () => {
  const res = await request(app)
    .get('/api/v1/products')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

//GET ONE
test("GET /api/v1/products/:id return 200 code", async () => {
  const res = await request(app)
    .get(`/api/v1/products/${productId}`)
  expect(res.status).toBe(200)
  expect(res.body.title).toBe("tv")
})

//PUT
test('Update/api/v1/products/:id should return 200', async () => {
  const body = {
    title: "tv"
  }
  const res = await request(app)
    .put(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(body);
  expect(res.status).toBe(200)
  expect(res.body.title).toBe(body.title)
})

//POST IMG PRODUCT_IMG
test("POST /products/:id/image should set the products images", async () => {
  const imgTest = {
    url: "test.img",
    publicId: "test.img"
  }
  const image = await ProductImg.create(imgTest)
  const res = await request(app)
    .post(`/api/v1/products/${productId}/image`)
    .set('Authorization', `Bearer ${token}`)
    .send([image.id]);
    // await imgTest.destroy();
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
  await ProductImg.destroy({ where: { id: image.id } })
})

//DELETE
test('Delete /api/v1/products:id should return 204', async () => {
  const res = await request(app)
    .delete(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
})
