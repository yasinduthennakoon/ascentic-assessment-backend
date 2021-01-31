const router = require('express').Router();
const authController = require('../controllers/auth/authController');


/**
 * @swagger
 * definitions:
 *  UserSignUp:
 *   type: object
 *   properties:
 *    firstName:
 *     type: string
 *     example: 'Jone'
 *    lastName:
 *     type: string
 *     example: 'dow'
 *    email:
 *     type: string
 *     example: 'jonedow@gmail.com'
 *    password:
 *     type: string
 *     example: 'Password123'
 *  UserSignIn:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     example: 'jonedow@gmail.com'
 *    password:
 *     type: string
 *     example: 'Password123'
 *
 */


/**
 * @swagger
 * /api/user/signup:
 *  post:
 *   summary: create new user
 *   description: create new user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the create user
 *      schema:
 *       $ref: '#/definitions/UserSignUp'
 *   responses:
 *    201:
 *     description: created user successful
 *    400:
 *     description: Invalid request body
 *    409:
 *     description: Email already exists
 *    500:
 *     description: Internal server error
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/user/signin:
 *  post:
 *   summary: create new user
 *   description: create new user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the create user
 *      schema:
 *       $ref: '#/definitions/UserSignIn'
 *   responses:
 *    200:
 *     description: Ok response with send access token
 *    400:
 *     description: Invalid request body
 *    401:
 *     description: Invalid password
 *    404:
 *     description: User not found
 *    500:
 *     description: Internal server error
 */
router.post('/signin', authController.signin);

module.exports = router;
