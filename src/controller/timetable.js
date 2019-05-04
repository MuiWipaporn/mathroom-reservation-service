import express from 'express';
import service from '../service';

const router = express.Router();

/**
 * @swagger
 * /timetables:
 *  get:
 *    description: get all timetable
 *    tags: [Timetable]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/timetables'
 */

router.get('/timetables', async (req, res) => {
  res.send(await service.viewTimetable.findAll());
});

/**
 * @swagger
 * /timetable/{subjectCode}:
 *  get:
 *    description: get timetable by subjectCode
 *    tags: [Timetable]
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: subjectCode
 *        in: path
 *        description: subject code
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/timetables'
 */

router.get('/timetable/:subjectCode', async (req, res) => {
  const { subjectCode } = req.params;
  res.send(await service.viewTimetable.findBySubjectCode(subjectCode));
});

/**
 * @swagger
 * /timetables/upload:
 *  post:
 *    description: create all timetable
 *    tags: [Timetable]
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        schema:
 *          $ref: '#/definitions/uploadTimetables'
 */

router.post('/timetables/upload', async (req, res) => {
  res.send(await service.timetable.bulkUploadTimetable(req.body));
});

export default router;

/**
 * @swagger
 * tags:
 *  - name: Timetable
 * definitions:
 *  uploadTimetables:
 *    type: object
 *    properties:
 *      status:
 *        type: boolean
 *  timetables:
 *    type: object
 *    properties:
 *      subjectCode:
 *        type: string
 *      courseTitle:
 *        type: string
 *      section:
 *        type: string
 *      typeTeach:
 *        type: string
 *      meetingDay:
 *        type: string
 *      duration:
 *        type: string
 *      roomName:
 *        type: string
 *      instructor:
 *        type: string
 */
