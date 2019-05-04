import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    subjectCode: { type: DataTypes.TEXT, allowNull: true },
    courseTitle: { type: DataTypes.TEXT, allowNull: true },
    section: { type: DataTypes.INTEGER, allowNull: true },
    typeTeach: { type: DataTypes.TEXT, allowNull: true },
    meetingDay: { type: DataTypes.TEXT, allowNull: true },
    duration: { type: DataTypes.TEXT, allowNull: true },
    roomName: { type: DataTypes.TEXT, allowNull: true },
    instructor: { type: DataTypes.TEXT, allowNull: true },
  };

  const ViewTimetable = sequelize.define('view_timetable', transformModel(model));

  return ViewTimetable;
};
