import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true },
    activityName: { type: DataTypes.TEXT, allowNull: true },
    roomName: { type: DataTypes.TEXT, allowNull: true },
    meetingDate: { type: DataTypes.TEXT, allowNull: true },
    startTime: { type: DataTypes.TIME, allowNull: true },
    endTime: { type: DataTypes.TIME, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    reserver: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.TEXT, allowNull: true },
  };

  const activity = sequelize.define('activity', transformModel(model), {
    paranoid: true,
  });

  return activity;
};
