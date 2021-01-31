const router = require('express').Router();
const todoController = require('../controllers/todo/todoController');
const { verifyAccessToken } = require('../helpers/jwt_token');

/**
 * @swagger
 * definitions:
 *  Todo:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     example: 'Test title'
 *    description:
 *     type: string
 *     example: 'Test description'
 *    activeStatus:
 *     type: boolean
 *     example: 'true'
 *
 */

/**
 * @swagger
 * /api/todo/create:
 *  post:
 *   summary: create todo
 *   description: create a new todo
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: user token
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the create todo
 *      schema:
 *       $ref: '#/definitions/Todo'
 *   responses:
 *    201:
 *     description: created todo successful
 *    400:
 *     description: Invalid request body
 *    401:
 *     description: Unauthorized - invalid user token
 *    500:
 *     description: Internal server error
 */
router.post('/create', verifyAccessToken, todoController.create);

/**
 * @swagger
 * /api/todo/update:
 *  patch:
 *   summary: update todo
 *   description: update for a todo recode
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: user token
 *    - in: path
 *      name: Todo_id
 *      schema:
 *       type: string
 *      required: true
 *      description: todo recode id
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the update todo
 *      schema:
 *       $ref: '#/definitions/Todo'
 *   responses:
 *    200:
 *     description: update todo successful
 *    400:
 *     description: Invalid request body
 *    401:
 *     description: Unauthorized - invalid user token
 *    500:
 *     description: Internal server error
 */
router.patch('/update/:id', verifyAccessToken, todoController.update);

/**
 * @swagger
 * /api/todo/getall:
 *  get:
 *   summary: get all todo recodes
 *   description: get all (completed and active) todo recodes
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: user token
 *   responses:
 *    200:
 *     description: Ok response with all todos
 *    401:
 *     description: Unauthorized - invalid user token
 *    500:
 *     description: Internal server error
 */
router.get('/getall', verifyAccessToken, todoController.getAll);

/**
 * @swagger
 * /api/todo/getactive:
 *  get:
 *   summary: get active todo recodes
 *   description: get only active todo recodes
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: user token
 *   responses:
 *    200:
 *     description: Ok response with active todos
 *    401:
 *     description: Unauthorized - invalid user token
 *    500:
 *     description: Internal server error
 */
router.get('/getactive', verifyAccessToken, todoController.getActive);

/**
 * @swagger
 * /api/todo/delete:
 *  delete:
 *   summary: get active todo recodes
 *   description: get only active todo recodes
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: user token
 *    - in: path
 *      name: Todo_id
 *      schema:
 *       type: string
 *      required: true
 *      description: todo recode id
 *   responses:
 *    200:
 *     description: Ok response and delete todo recode
 *    401:
 *     description: Unauthorized - invalid user token
 *    500:
 *     description: Internal server error
 */
router.delete('/delete/:id', verifyAccessToken, todoController.delete);

module.exports = router;
