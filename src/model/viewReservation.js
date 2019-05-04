import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    start: { type: DataTypes.TIME, allowNull: true },
    end: { type: DataTypes.TIME, allowNull: true },
    resourceId: { type: DataTypes.TEXT, allowNull: true },
    title: { type: DataTypes.TEXT, allowNull: true },
    reservation_type: { type: DataTypes.TEXT, allowNull: true },
    reserver: { type: DataTypes.TEXT, allowNull: true },
  };

  const ViewReservation = sequelize.define('view_reservation', transformModel(model), {
    paranoid: false,
  });

  return ViewReservation;
};
