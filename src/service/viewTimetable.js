import { Op } from 'sequelize';
import model from '../model';

const findAll = async () => {
  const result = await model.viewTimetable.findAll({
    attributes: ['subjectCode', 'courseTitle', 'section', 'typeTeach', 'meetingDay', 'duration', 'roomName', 'instructor'],
  });
  return result;
};

const findBySubjectCode = async (subjectCode) => {
  const result = await model.viewTimetable.findAll({
    attributes: ['subjectCode', 'courseTitle', 'section', 'typeTeach', 'meetingDay', 'duration', 'roomName', 'instructor'],
    where: {
      subjectCode: { [Op.like]: `%${subjectCode}%` },
    },
  });
  return result;
};

export default {
  findAll,
  findBySubjectCode,
};
