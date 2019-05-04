import { compose, map, first, last, split, flattenDeep, filter, getOr } from 'lodash/fp';
import momentWeekdaysin from 'moment-weekdaysin';
import moment from 'moment';
import service from '../service';
import model from '../model';
import {
  transformDataURL,
  base64XlsToJson,
  mapArrayObjectKeyToCamelCase,
  model2Object,
} from '../util';
import { RESERVATION_TYPE_TIMETABLE } from '../constants';

const bulkUploadTimetable = async ({ dataUrl }) => {
  let timetablesData = await compose(
    base64XlsToJson,
    transformDataURL,
  )(dataUrl);


  timetablesData = filter(({ typeTeach }) => typeTeach === 'LEC' || typeTeach === 'LAB')(mapArrayObjectKeyToCamelCase(timetablesData));
  timetablesData = filter(({ meetingDay }) => meetingDay !== '')(timetablesData);

  const termOfTimetable = getOr(null, 'term')(first(timetablesData));
  const rawTimetable = await model.timetable.findAll();
  const termInTimeTable = compose(
    getOr(null, 'term'),
    first,
    model2Object,
  )(rawTimetable);
  if (termOfTimetable !== termInTimeTable) {
    const deleteConfig = 'DELETE FROM config';
    await model.sequelize.query(deleteConfig, {
      type: model.sequelize.QueryTypes.DELETE,
    });
  }
  const reservationDate = await service.config.findByConfigType(RESERVATION_TYPE_TIMETABLE);
  // delete all data
  // 1.1 delete all timetable
  const deleteTimetable = `DELETE FROM timetable where term = ${termOfTimetable}`;
  await model.sequelize.query(deleteTimetable, {
    type: model.sequelize.QueryTypes.DELETE,
  });

  // 1.2 delete all subject
  const deleteSubject = `DELETE FROM subject where term = ${termOfTimetable}`;
  await model.sequelize.query(deleteSubject, {
    type: model.sequelize.QueryTypes.DELETE,
  });

  // 1.3 delete all activity (let's discuss again)
  const deleteActivity = 'DELETE FROM activity where user_id = 0';
  await model.sequelize.query(deleteActivity, {
    type: model.sequelize.QueryTypes.DELETE,
  });

  // 2. set default value
  // 2.1 subject data
  const filteredSubjectData = map(
    ({ term, subjectCode, courseTitle, section, typeTeach, instructor }) => ({
      term,
      subjectCode,
      courseTitle,
      section,
      typeTeach,
      instructor,
    }))(timetablesData);
  // 2.2 timetable data
  const filteredTimetableData = map(
    ({ term, subjectCode, room, meetingDay, meetingTime }) => ({
      term,
      subjectCode,
      roomName: room,
      meetingDay,
      startTime: first(split('-')(meetingTime)),
      endTime: last(split('-')(meetingTime)),
    }))(timetablesData);
  // 2.3 activity data
  const rawActivityData = flattenDeep(
    map(({ startDate, endDate }) => {
      const result = map(({ term, room, subjectCode, meetingDay, meetingTime, instructor }) => {
        const meetingDates = split(' ')(meetingDay);
        return map(weekOfDay => {
          const configStartDate = moment(startDate).format('YYYY-MM-DD');
          const configEndDate = moment(endDate).format('YYYY-MM-DD');
          const dateBetweens = momentWeekdaysin(configStartDate).weekdaysInBetween(configEndDate, weekOfDay);
          return map(date => ({
            term,
            activityName: subjectCode,
            roomName: room,
            meetingDate: moment(date).format('YYYY-MM-DD'),
            startTime: `${first(split('-')(meetingTime))}:00`,
            endTime: `${last(split('-')(meetingTime))}:00`,
            userId: 0,
            reserver: instructor,
            status: RESERVATION_TYPE_TIMETABLE,
          }))(dateBetweens);
        })(meetingDates);
      })(timetablesData);
      return result;
    })(reservationDate));

  const filteredActivityData = filter(({ meetingDate }) => meetingDate !== 'Invalid date')(rawActivityData);
  // 3. bulk insert to db
  try {
    // 3.1 bulk insert subject
    await model.subject.bulkCreate(
      filteredSubjectData,
      { fields: ['term', 'subjectCode', 'courseTitle', 'section', 'typeTeach', 'instructor'] },
    );
    // 3.2 bulk insert timetable
    await model.timetable.bulkCreate(
      filteredTimetableData,
      { fields: ['term', 'subjectCode', 'roomName', 'meetingDay', 'startTime', 'endTime'] },
    );
    // 3.3 bulk insert activity
    await model.activity.bulkCreate(
      filteredActivityData,
      { fields: ['activityName', 'roomName', 'meetingDate', 'startTime', 'endTime', 'userId', 'reserver', 'status'] },
    );
    return { status: true };
  } catch (errorMessage) {
    console.log(`Error ${errorMessage}`);
    return { status: false };
  }
};

export default {
  bulkUploadTimetable,
};
