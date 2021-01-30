const router = require('express').Router();
const todoController = require('../controllers/todo/todoController');
const { verifyAccessToken } = require('../helpers/jwt_token');

router.post('/create', verifyAccessToken, todoController.create);

module.exports = router;
