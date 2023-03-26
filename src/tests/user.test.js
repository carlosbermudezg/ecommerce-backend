const request = require('supertest');
const app = require('../app');

let userId;
let token;


//POST
test("Post / should create a new user and return code 201", async () => {
  const newUser = {
    firstName: "Gabriel",
    lastName: "Martinez",
    email: "martinez@test.com",
    password: "test",
    phone: "+3532438269"
  }
  const res = await request(app)
    .post("/api/v1/users")
    .send(newUser)
  userId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newUser.firstName)
})

//LOGIN
test('Post /user/login/ should do login', async () => {
  const newUser = {
    email: "martinez@test.com",
    password: "test"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(newUser)

  expect(res.status).toBe(200)
  expect(res.body.user.email).toBe(newUser.email)
  token = res.body.token
  expect(res.body.token).toBeDefined()
})

test('Post /api/v1/users/login/ with invalid credentials should 401', async () => {
  const newUser = {
    email: "martinez@test.com",
    password: "testsda"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(newUser)

  expect(res.status).toBe(401)
})

//GET
test("GET / return code for the user should be 200", async () => {
  const res = await request(app)
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(2)
})

//GET ONE
test("GET /api/v1/users/:id return 200 code", async () => {
  const res = await request(app)
    .get(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe("Gabriel")
})

//UPDATE
test('Update/api/v1/users/:id should return 200', async () => {
  const body = {
    firstName: "Gabriel"
  }
  const res = await request(app)
    .put(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(body);
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(body.firstName)
})

//DELETE
test('Delete /api/v1/users:id should return 204', async () => {
  const res = await request(app)
    .delete(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
})
