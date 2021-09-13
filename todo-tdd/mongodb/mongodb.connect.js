const mongoose = require('mongoose')

const mongoDBURI = 'mongodb+srv://prajval:prajval@cluster0.tdwfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://prajval:prajval@cluster0.tdwfs.mongodb.net/todo-tdd?retryWrites=true&w=majority'),
        { useNewUrlParser: true },
        { useUnifiedTopology: true }
    }
    catch {
        console.log("error connecting to mongodb: ", error)
    }
}

module.exports = { connect }