const Todo = require('../../model/Todos');

exports.create = async (req, res) => {
    console.log(req.payload);

    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        userId: req.payload.userId,
    });

    try {
        const savedTodo = await newTodo.save();
        return res.status(200).send(savedTodo);
    } catch (error) {
        return res.status(400).send('Internal error');
    }
};

exports.update = async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).send(updateTodo);
    } catch (error) {
        console.log(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const allTodos = await Todo.find({userId: req.payload.userId})    
        res.status(200).send(allTodos);
    } catch (error) {
        console.log(error);
    }
};

exports.getActive = async (req, res) => {
    try {
        const allTodos = await Todo.find({userId: req.payload.userId, status: false})    
        res.status(200).send(allTodos);
    } catch (error) {
        console.log(error);
    }
};

