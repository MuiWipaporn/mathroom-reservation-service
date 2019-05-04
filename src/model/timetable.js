import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    term: { type: DataTypes.TEXT, allowNull: true },
    subjectCode: { type: DataTypes.TEXT, allowNull: true },
    roomName: { type: DataTypes.TEXT, allowNull: true },
    meetingDay: { type: DataTypes.TEXT, allowNull: true },
    startTime: { type: DataTypes.TIME, allowNull: true },
    endTime: { type: DataTypes.TIME, allowNull: true },
  };

  const timetable = sequelize.define('timetable', transformModel(model), {
    paranoid: true,
  });

  return timetable;
};
