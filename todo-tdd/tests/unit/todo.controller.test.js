// Unit tests demo
const TodoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')

// creating a mock function using jest.fn()
TodoModel.create = jest.fn()

let req, res, next
// function to run before each test, reduces redundant code
beforeEach(() => {
    // creating mock response and request objects
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

// describe creates a test suite
describe('TodoController.createTodo', () => {

    beforeEach(() => {
        req.body = newTodo
    })

    it("it should have a create todo function", () => {
        expect(typeof TodoController.createTodo).toBe("function")
    })

    it("should call TodoModel.create", () => {
        TodoController.createTodo(req, res, next)
        expect(TodoModel.create).toBeCalledWith(newTodo)
    })

    it("should return 201 response code", async () => {
        await TodoController.createTodo(req, res, next)
        expect(res.statusCode).toBe(201)
        // res._isEndCalled checks if the response(status code of 201)
        //  has been sent back
        //   (accomplished by doing res.send())
        expect(res._isEndCalled()).toBeTruthy()
    })

    it("should return json formatted data in response", async () => {
        TodoModel.create.mockReturnValue(newTodo)
        await TodoController.createTodo(req, res, next)
        // _getJSONData
        // NOTE: here, instead of using .toBe(), we use .toStrictEqual(),
        //    as toBe() checks for the objects being compared to be in the 
        //    same memory, whereas toStrictEqual() just checks if the objects 
        //    are equal in value 
        console.log('json data: ', res._getJSONData())
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    // testing the case where TodoModel.create might return an error
    // this might be the case if say it returns a rejected promise
    it('should handle errors', async () => {
        const errorMessage = { message: "Done property missing" }
        // we create a rejected promise, assign it to a variable,
        // use a jest function to mock the retval
        const rejectedPromise = Promise.reject(errorMessage)
        TodoModel.create.mockReturnValue(rejectedPromise)
        await TodoController.createTodo(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })

})

