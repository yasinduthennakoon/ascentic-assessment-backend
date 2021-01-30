const router = require('express').Router();
const todoController = require('../controllers/todo/todoController');
const { verifyAccessToken } = require('../helpers/jwt_token');

router.post('/create', verifyAccessToken, todoController.create);
router.post('/update/:id', verifyAccessToken, todoController.update);

module.exports = router;
