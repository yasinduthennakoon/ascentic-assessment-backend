const Todo = require('../../model/Todos');
const createError = require('../../helpers/error_response');
const createResponse = require('../../helpers/success_response');
const { logger, fileLogger } = require('../../helpers/logger');
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
        return res.status(201).send(createResponse(savedTodo));
    } catch (error) {
        logger.error(error);
        fileLogger.error(error);
        if (error.isJoi === true) return res.status(400).send(createError('Invalid request body'));
        return res.status(500).send(createError('Internal server error'));
    }
};

exports.update = async (req, res) => {
    try {
        // validating request body
        const validateBody = await updateTodoSchema.validateAsync(req.body);

        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, validateBody, {
            new: true,
        });

        return res.status(200).send(createResponse(updateTodo));
    } catch (error) {
        logger.error(error);
        fileLogger.error(error);
        if (error.isJoi === true) return res.status(400).send(createError('Invalid request body'));
        return res.status(500).send(createError('Internal server error'));
    }
};

exports.getAll = async (req, res) => {
    try {
        const allTodos = await Todo.find({ userId: req.payload.userId });
        return res.status(200).send(createResponse(allTodos));
    } catch (error) {
        logger.error(error);
        fileLogger.error(error);
        return res.status(500).send(createError('Internal server error'));
    }
};

exports.getActive = async (req, res) => {
    try {
        const allActiveTodos = await Todo.find({ userId: req.payload.userId, activeStatus: true });
        return res.status(200).send(createResponse(allActiveTodos));
    } catch (error) {
        logger.error(error);
        fileLogger.error(error);
        return res.status(500).send(createError('Internal server error'));
    }
};

exports.delete = async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id }, { new: true });
        return res.status(200).send(createResponse(null));
    } catch (error) {
        logger.error(error);
        fileLogger.error(error);
        return res.status(500).send(createError('Internal server error'));
    }
};
