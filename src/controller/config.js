import express from 'express';
import service from '../service';

const router = express.Router();

/**
 * @swagger
 * /config/timetable-range/{configType}:
 *  get:
 *    description: get all timetable range
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/config'
 */

router.get('/config/timetable-range/:configType', async (req, res) => {
  const { configType } = req.params;
  res.send(await service.config.findByConfigType(configType));
});


/**
 * @swagger
 * /config/timetable-range:
 *  post:
 *    description: get all room
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/config'
 */

router.post('/config/timetable-range', async (req, res) => {
  res.send(await service.config.createTimetableConfig(req.body));
});

/**
 * @swagger
 * /config/timetable-range/{id}:
 *  delete:
 *    description: delete config by id
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: config id
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.delete('/config/timetable-range/:id', async (req, res) => {
  const { id } = req.params;
  res.send(await service.config.deleteById(id));
});

/**
 * @swagger
 * /config/reservation-range:
 *  post:
 *    description: get all room
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/config'
 */

router.post('/config/reservation-range', async (req, res) => {
  res.send(await service.config.createReservationConfig(req.body));
});

/**
 * @swagger
 * /config/reservation-range/{id}:
 *  delete:
 *    description: delete config by id
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: config id
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/verifyLogin'
 */

router.delete('/config/reservation-range/:id', async (req, res) => {
  const { id } = req.params;
  res.send(await service.config.deleteById(id));
});

/**
 * @swagger
 * /config/rooms:
 *  post:
 *    description: get all room
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/config'
 */

router.post('/config/rooms', async (req, res) => {
  res.send(await service.room.bulkUploadRooms(req.body));
});

/**
 * @swagger
 * /config/users:
 *  post:
 *    description: get all room
 *    tags: [Config]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/config'
 */

router.post('/config/users', async (req, res) => {
  res.send(await service.user.bulkUploadUser(req.body));
});

export default router;

/**
 * @swagger
 * tags:
 *  - name: Config
 * definitions:
 *  config:
 *    type: object
 *    properties:
 *      isOk:
 *        type: boolean
 */
