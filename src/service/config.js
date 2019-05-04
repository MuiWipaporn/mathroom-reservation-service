import { compose } from 'lodash/fp';
import { mapArrayObjectKeyToCamelCase, model2Object } from '../util';
import { RESERVATION_TYPE_TIMETABLE, RESERVATION_STATUS } from '../constants';
import model from '../model';

const findByConfigType = async (type) => {
  const result = await model.config.findAll({
    where: {
      type,
    },
  });

  return compose(
    mapArrayObjectKeyToCamelCase,
    model2Object,
  )(result);
};

const createTimetableConfig = async ({ startDate, endDate }) => {
  const config = {
    start_date: startDate,
    end_date: endDate,
    type: RESERVATION_TYPE_TIMETABLE,
  };
  try {
    const result = await model.config.create(config);
    const { id } = model2Object(result);
    return { id, status: true };
  } catch (err) {
    console.log('err: ', err);
    return { status: false };
  }
};

const createReservationConfig = async ({ startDate, endDate }) => {
  const config = {
    start_date: startDate,
    end_date: endDate,
    type: RESERVATION_STATUS,
  };
  try {
    const result = await model.config.create(config);
    const { id } = model2Object(result);
    return { id, status: true };
  } catch (err) {
    console.log('err: ', err);
    return { status: false };
  }
};

const deleteById = async (id) => {
  const nativeSql = `DELETE FROM config where id = ${id}`;
  try {
    await model.sequelize.query(nativeSql, {
      type: model.sequelize.QueryTypes.DELETE,
    });
  } catch (err) {
    console.log('err: ', err);
    return { status: false };
  }
  return { status: true };
};

export default {
  findByConfigType,
  createTimetableConfig,
  createReservationConfig,
  deleteById,
};
