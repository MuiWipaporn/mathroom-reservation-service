import express from 'express';
import service from '../service';

const router = express.Router();

/**
 * @swagger
 * /login:
 *  post:
 *    description: user login
 *    tags: [User]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.post('/login', async (req, res) => {
  res.send(await service.user.verifyLogin(req.session.id, req.body));
});

export default router;

/**
 * @swagger
 * tags:
 *  - name: Room
 * definitions:
 *  verifyLogin:
 *    type: object
 *    properties:
 *      isOk:
 *        type: boolean
 *      token:
 *        type: string
 */
