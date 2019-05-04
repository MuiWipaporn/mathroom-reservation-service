import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    username: { type: DataTypes.TEXT, allowNull: false },
    firstname: { type: DataTypes.TEXT, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.TEXT, allowNull: false },
    token: { type: DataTypes.TEXT, allowNull: true },
  };

  return sequelize.define('user', transformModel(model));
};
