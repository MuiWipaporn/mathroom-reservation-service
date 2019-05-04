import { isNil, some, compose } from 'lodash/fp';
import { Op } from 'sequelize';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { model2Object, mapArrayObjectKeyToCamelCase } from '../util';
import model from '../model';
import {
  RESERVATION_STATUS_CONFIRM,
  RESERVATION_STATUS_AFTER_HOUR,
  RESERVATION_TYPE_TIMETABLE,
  RESERVATION_STATUS_PENDING,
  START_TIME_AFTER_HOUR,
  END_TIME_AFTER_HOUR,
  TIMETABLE_ID,
} from '../constants';

const moment = extendMoment(Moment);

const verifyTimeRange = async (reserveData) => {
  if (some(reserveData, isNil)) { return { isOk: false }; }
  let isValid = false;
  const { startDate, endDate } = reserveData;
  const currentTimeRange = moment.range(startDate, endDate);
  const configData = await model.config.findAll({
    where: {
      type: RESERVATION_TYPE_TIMETABLE,
    },
  });

  // check time range is overlap
  for (const data of model2Object(configData)) {
    const timeRange = moment.range(data.startDate, data.endDate);
    isValid = isValid || currentTimeRange.overlaps(timeRange);
  }

  return { isOk: isValid };
};

const createActivity = async (reserveData) => {
  const { isOk } = await verifyTimeRange(reserveData);
  if (isOk) {
    const { activityName, roomName, startDate, endDate, userId, reserver } = reserveData;
    const meetingDate = moment(startDate).format('YYYY-MM-DD');
    const startTime = startDate.split(' ')[1];
    const endTime = endDate.split(' ')[1];
    const afterHoursTimeRange = moment.range(
      `${meetingDate} ${START_TIME_AFTER_HOUR}`,
      `${meetingDate} ${END_TIME_AFTER_HOUR}`,
    );

    const reserveTimeRange = moment.range(startDate, endDate);
    const currentDate = moment();
    const hours = moment(startDate).diff(currentDate, 'hours');
    let status = RESERVATION_STATUS_CONFIRM;
    if (afterHoursTimeRange.overlaps(reserveTimeRange)) {
      status = RESERVATION_STATUS_AFTER_HOUR;
    } else if (hours <= 24) {
      status = RESERVATION_STATUS_PENDING;
    }

    const activity = {
      activityName,
      roomName,
      meetingDate,
      startTime,
      endTime,
      userId,
      reserver,
      status,
    };
    await model.activity.create(activity);
    return { isOk: true };
  }
  return { isOk: false };
};

const findAllAcitivities = async () => {
  const result = await model.activity.findAll({
    where: {
      userId: {
        [Op.ne]: TIMETABLE_ID,
      },
    },
  });
  return {
    data: compose(mapArrayObjectKeyToCamelCase, model2Object)(result) };
};

const findByUserId = async (userId) => {
  const result = await model.activity.findAll({
    where: {
      userId,
    },
  });

  return { data: model2Object(result) };
};

const deleteById = async (id) => {
  const nativeSql = `DELETE FROM activity where id = ${id}`;
  await model.sequelize.query(nativeSql, {
    type: model.sequelize.QueryTypes.DELETE,
  });

  return { status: true };
};

export default {
  verifyTimeRange,
  createActivity,
  findAllAcitivities,
  findByUserId,
  deleteById,
};
