import { map } from 'lodash/fp';
import { model2Object } from '../util';
import {
  RESERVATION_STATUS_PENDING,
  RESERVATION_STATUS_AFTER_HOUR,
  RESERVATION_TYPE_TIMETABLE,
  RESERVATION_STATUS_CONFIRM,
  RESERVATION_COLOR_TIMETABLE,
  RESERVATION_COLOR_AFTER_HOUR,
  RESERVATION_COLOR_CONFIRM,
  RESERVATION_COLOR_PENDING,
} from '../constants';
import model from '../model';

const bgColor = {
  [RESERVATION_STATUS_PENDING]: RESERVATION_COLOR_PENDING,
  [RESERVATION_STATUS_AFTER_HOUR]: RESERVATION_COLOR_AFTER_HOUR,
  [RESERVATION_TYPE_TIMETABLE]: RESERVATION_COLOR_TIMETABLE,
  [RESERVATION_STATUS_CONFIRM]: RESERVATION_COLOR_CONFIRM,
};

const findAll = async () => {
  const rawData = await model.viewReservation.findAll({
    attributes: ['id', 'start', 'end', 'resourceId', 'title', 'reservation_type', 'reserver'],
  });
  const result = map(data => ({
    ...data,
    bgColor: bgColor[data.reservation_type],
  }))(model2Object(rawData));
  return result;
};

export default {
  findAll,
};
