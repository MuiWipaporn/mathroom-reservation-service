import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    roomName: { type: DataTypes.TEXT, allowNull: false },
    floor: { type: DataTypes.INTEGER, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    type: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false },
  };

  const room = sequelize.define('room', transformModel(model));

  return room;
};
