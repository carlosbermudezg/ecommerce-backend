const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models')

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
test("Post / cart should create one cart", async () => {

  const product = await Product.create({
    title: "tv",
    description: "lorem30",
    price: 230
  })

  const cart = {
    quantity: 1,
    productId: product.id
  }
  const res = await request(app)
    .post("/api/v1/cart")
    .send(cart)
    .set('Authorization', `Bearer ${token}`)
  await product.destroy()
  expect(res.status).toBe(201)
  expect(res.body.quantity).toBe(cart.quantity)
})


//GET
test("GET / favorites should return all favorites", async () => {
  const res = await request(app)
    .get('/api/v1/cart')
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})