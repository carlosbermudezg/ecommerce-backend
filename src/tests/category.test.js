const request = require('supertest');
const app = require('../app');

let categoryId;
let token;

beforeAll(async()=>{
  const credentials = {
    email:"martinez1234@test.com",
    password:"test"
  }
  res = await request(app).post('/api/v1/users/login').send(credentials)
  token = res.body.token
})

//POST
test("Post / should create a new category and return code 201", async () => {
  const newCategory = {
    name: "tv"
  }
  const res = await request(app)
    .post("/api/v1/categorys")
    .set('Authorization', `Bearer ${token}`)
    .send(newCategory)
  categoryId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.name).toBe(newCategory.name)
})

//GET
test("GET / return code for the user should be 200", async () => {
  const res = await request(app)
    .get('/api/v1/categorys')
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

//GET ONE
test("GET /api/v1/categorys/:id return 200 code", async () => {
  const res = await request(app)
  .get(`/api/v1/categorys/${categoryId}`)
  .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe("tv")
})

//DELETE
test('Delete /api/v1/categorys:id should return 204', async () => {
  const res = await request(app)
  .delete(`/api/v1/categorys/${categoryId}`)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
})
