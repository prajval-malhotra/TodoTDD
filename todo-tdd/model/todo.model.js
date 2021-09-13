const mongoose = require('mongoose')

//  defining a schema
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    }
})

// for todos collection in database
// .model creates a copy of the schema
const TodoModel = mongoose.model("Todo", TodoSchema)

module.exports = TodoModel
