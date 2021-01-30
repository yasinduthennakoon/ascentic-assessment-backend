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
    res.status(200).send("update");
};
