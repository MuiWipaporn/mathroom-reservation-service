import Sequelize from 'sequelize';
import config from '../config';
import ViewTimetable from './viewTimetable';
import ViewReservation from './viewReservation';
import Room from './room';
import Subject from './subject';
import Timetable from './timetable';
import Activity from './activity';
import User from './user';
import Config from './config';

Sequelize.postgres.DECIMAL.parse = (value) => parseFloat(value);

const sequelize = new Sequelize(
  config.dbScheme,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
    operatorAliases: false,
    logging: !config.disableSqlLog, // Note. false is not to print on console.
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  },
);

const db = {
  viewTimetable: sequelize.import('view_timetable', ViewTimetable),
  viewReservation: sequelize.import('view_reservation', ViewReservation),
  room: sequelize.import('room', Room),
  subject: sequelize.import('subject', Subject),
  timetable: sequelize.import('timetable', Timetable),
  activity: sequelize.import('activity', Activity),
  user: sequelize.import('user', User),
  config: sequelize.import('config', Config),
};

Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize; // Configured model
db.Sequelize = Sequelize; // Sequelize library

export default db;
