// supertest: something we can use to test the whole node.js apps endpoints
const request = require('supertest')
// app is the express app we previously created
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')
// the endpoint we are testing - (url of endpoint) 
const endpoint = '/todos/'

describe(endpoint, () => {
    it("POST" + endpoint, async () => {
        // await, as request is an async function
        const response = await request(app) // creating a request to the created app
        .post(endpoint)  // of type post, with endpoint URL = 'endpoint'
        .send(newTodo)   // sending data 'newTodo'
        expect(response.statusCode).toBe(201)
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.done).toBe(newTodo.done)
    })

    // making a test for malformed data (return 500 status code)
    it("should return error 500 on malformed data with POST" + endpoint, 
    async () => {
        const response = await request(app)
            .post(endpoint)
            // sending data without the required "done" property
            .send({title: "missing done property"})
        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual(
            { message: "Todo validation failed: done: Path `done` is required." }
        )
    })
})