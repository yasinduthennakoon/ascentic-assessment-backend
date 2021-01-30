const router = require('express').Router();
const todoController = require('../controllers/todo/todoController');
const { verifyAccessToken } = require('../helpers/jwt_token');

router.post('/create', verifyAccessToken, todoController.create);
router.patch('/update/:id', verifyAccessToken, todoController.update);
router.get('/getall', verifyAccessToken, todoController.getAll);
router.get('/getactive', verifyAccessToken, todoController.getActive);
router.delete('/delete/:id', verifyAccessToken, todoController.delete);

module.exports = router;
