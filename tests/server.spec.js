const request = require("supertest");
const server = require("../index");

describe("GET /cafes", () => {
    it('Should return status code 200', async ()=> {
        const response = await request(server).get('/cafes')
        expect(response.status).toBe(200)
    })
    it("Data type is Array with min one object", async() => {
        const response = await request(server).get('/cafes')
        expect(Array.isArray(response.body)).toBe(true) 
        //expect(response.body).toBeInstanceof(Array) <-- Tambien puede ser asi
    })
});

describe('POST /cafes', () => {
  it('should create a new café and respond with status code 201', async () => {
    const newCafe = {
      id: '5',
      nombre: 'some name'
    };
    const response = await request(server)
      .post('/cafes')
      .send(newCafe);
    expect(response.status).toBe(201);
  });
});

describe('DELETE /cafes', () => {
  it('should return status code 404 when trying to delete a café with a non-existent id', async () => {
    const response = await request(server)
      .delete('/cafes/invalid-id')
      .set('Authorization', 'test-token');
    expect(response.status).toBe(404);
  });
});

describe('PUT /cafes/:id', () => {
  it('should return status code 400 when the id in params does not match the id in the body', async () =>{
    const coffe = {    
      "id": 1,
      "nombre": "Americano"
    }
      const response = await request(server)
        .put('/cafes/2')
        .send(coffe)
      expect(response.status).toBe(400)
  })
})

