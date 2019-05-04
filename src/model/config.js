import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    start_date: { type: DataTypes.TEXT, allowNull: false },
    end_date: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.TEXT, allowNull: false },
  };

  return sequelize.define('config', transformModel(model));
};
