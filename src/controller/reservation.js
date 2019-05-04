import express from 'express';
import service from '../service';

const router = express.Router();

/**
 * @swagger
 * /reservations:
 *  get:
 *    description: get all reservations
 *    tags: [Reservation]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/reservations'
 */

router.get('/reservations', async (req, res) => {
  res.send(await service.viewReservation.findAll());
});

export default router;

/**
 * @swagger
 * tags:
 *  - name: Reservation
 * definitions:
 *  reservations:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      start:
 *        type: string
 *      end:
 *        type: string
 *      title:
 *        type: string
 *      resourceId:
 *        type: integer
 *      bgColor:
 *        type: string
 */

