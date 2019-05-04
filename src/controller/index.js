import express from 'express';
import Timetable from './timetable';
import Room from './room';
import Reservation from './reservation';
import User from './user';
import Activity from './activity';
import Config from './config';

const controllers = [
  Timetable,
  Room,
  Reservation,
  User,
  Activity,
  Config,
];

const api = express.Router();

api.use(controllers);

export default api;
