const Todo = require('../../model/Todos');
const User = require('../../model/User');

exports.create = async (req, res) =>{
    console.log(req.payload);
    
    res.status(200).send('Create todo');

} 
