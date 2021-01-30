const Todo = require('../../model/Todos');
const createError = require('../../helpers/error_response')
const { createTodoSchema, updateTodoSchema } = require('../../helpers/validation_schema');

exports.create = async (req, res) => {
    try {
        // validating request body
        const validateBody = await createTodoSchema.validateAsync(req.body);

        const newTodo = new Todo({
            title: validateBody.title,
            description: validateBody.description,
            activeStatus: validateBody.activeStatus,
            userId: req.payload.userId,
        });

        const savedTodo = await newTodo.save();
        return res.status(200).send(savedTodo);
    } catch (error) {
        if(error.isJoi === true)return res.status(400).send(createError("Invalid request body"));

        return res.status(500).send(createError("Internal server error"));
        
    }
};

exports.update = async (req, res) => {
    try {
        // validating request body
        const validateBody = await updateTodoSchema.validateAsync(req.body);

        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, validateBody, {
            new: true,
        });

        return res.status(200).send(updateTodo);
    } catch (error) {
        return res.status(400).send(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const allTodos = await Todo.find({ userId: req.payload.userId });
        res.status(200).send(allTodos);
    } catch (error) {
        console.log(error);
    }
};

exports.getActive = async (req, res) => {
    try {
        const allActiveTodos = await Todo.find({ userId: req.payload.userId, status: true });
        res.status(200).send(allActiveTodos);
    } catch (error) {
        console.log(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const deleteTodo = await Todo.deleteOne({ _id: req.params.id }, { new: true });
        console.log(deleteTodo);
        res.status(200).send(deleteTodo);
    } catch (error) {
        console.log(error);
    }
};
