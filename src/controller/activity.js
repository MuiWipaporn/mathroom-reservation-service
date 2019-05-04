import express from 'express';
import service from '../service';

const router = express.Router();

/**
 * @swagger
 * /activity/reserve:
 *  post:
 *    description: reserve activity
 *    tags: [Activity]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.post('/activity/reserve', async (req, res) => {
  res.send(await service.activity.createActivity(req.body));
});

/**
 * @swagger
 * /activity/verify:
 *  post:
 *    description: verify reserve activity
 *    tags: [Activity]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.post('/activity/verify', async (req, res) => {
  res.send(await service.activity.verifyTimeRange(req.body));
});

/**
 * @swagger
 * /activities:
 *  get:
 *    description: get all activities
 *    tags: [Activity]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.get('/activities', async (req, res) => {
  res.send(await service.activity.findAllAcitivities());
});

/**
 * @swagger
 * /activity/user/{userId}:
 *  get:
 *    description: get activity by userId
 *    tags: [Activity]
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: userId
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.get('/activity/user/:userId', async (req, res) => {
  const { userId } = req.params;
  res.send(await service.activity.findByUserId(userId));
});

/**
 * @swagger
 * /activity/{id}:
 *  delete:
 *    description: get activity by id
 *    tags: [Activity]
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: activity id
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.delete('/activity/:id', async (req, res) => {
  const { id } = req.params;
  res.send(await service.activity.deleteById(id));
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
