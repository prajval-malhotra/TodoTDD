const TodoModel = require('../model/todo.model')

exports.createTodo = async (req, res, next) => {
    try {
        const created = await TodoModel.create(req.body)
        res.status(201).json(created)
    }
    catch(err) {
        next(err)
    }
}