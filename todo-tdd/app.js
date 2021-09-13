const express = require("express")
const todoRoutes = require('./routes/todo.routes')
// creating an express application
const app = express()
const mongodb = require('./mongodb/mongodb.connect')

// connect to database
mongodb.connect()

//  -- middleware
// method inbuilt in express to recognize the 
//  incoming Request Object as a JSON Object
// (if we exclude this, and try to send json data, the object
//  comes out undefined, rather than being equal to the passed data)
app.use(express.json())

// defining the endpoint we want to use for all the routes - 
//   (use means its going to use it for all http reqs - CRUD)
app.use('/todos', todoRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({message: error.message})
})

app.get('/', (req, res) => { 
    res.json('hello world')
});

module.exports = app