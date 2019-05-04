import express from 'express';
import service from '../service';

const router = express.Router();

/**
 * @swagger
 * /rooms:
 *  get:
 *    description: get all room
 *    tags: [Room]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/rooms'
 */

router.get('/rooms', async (req, res) => {
  res.send(await service.room.findAll());
});

export default router;

/**
 * @swagger
 * tags:
 *  - name: Room
 * definitions:
 *  rooms:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      roomName:
 *        type: string
 *      floor:
 *        type: integer
 *      capacity:
 *        type: integer
 *      type:
 *        type: string
 *      status:
 *        type: string
 *      createdAt:
 *        type: string
 *      updatedAt:
 *        type: string
 *      deletedAt:
 *        type: string
 *  uploadRooms:
 *    type: object
 *    properties:
 *      status:
 *        type: boolean
 */
