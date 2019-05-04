import transformModel from '../util/transformModel';

export default (sequelize, DataTypes) => {
  const model = {
    term: { type: DataTypes.TEXT, allowNull: true },
    subjectCode: { type: DataTypes.TEXT, allowNull: false },
    courseTitle: { type: DataTypes.TEXT, allowNull: false },
    section: { type: DataTypes.TEXT, allowNull: false },
    typeTeach: { type: DataTypes.TEXT, allowNull: false },
    instructor: { type: DataTypes.TEXT, allowNull: false },
    remark: { type: DataTypes.TEXT, allowNull: false },
  };

  const subject = sequelize.define('subject', transformModel(model), {
    paranoid: true,
  });

  return subject;
};
