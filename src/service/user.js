import { compose, getOr, isNil } from 'lodash/fp';
import { model2Object, btoa, base64XlsToJson, transformDataURL } from '../util';
import model from '../model';

const findAll = async () => {
  const result = await model.room.findAll();
  return result;
};

const verifyLogin = async (session, userData) => {
  const username = getOr(null, 'username')(userData);
  const password = getOr(null, 'password')(userData);

  if (isNil(username) || isNil(password)) return { isOK: false };

  const condition = {
    where: {
      username,
      password,
    },
  };

  const userInfo = await model.user.findOne({ ...condition });
  const userId = compose(
    getOr(null, 'id'),
    model2Object,
  )(userInfo);

  const role = compose(
    getOr(null, 'role'),
    model2Object,
  )(userInfo);

  const firstName = compose(
    getOr(null, 'firstname'),
    model2Object,
  )(userInfo);

  const userToken = {
    id: userId,
    token: session,
    role,
    firstName,
  };

  const token = btoa(JSON.stringify(userToken));

  if (isNil(userInfo)) return { isOK: false };
  userInfo.set({ token });
  userInfo.save();

  return {
    isOK: true,
    token,
  };
};

const verifyToken = async (token) => {
  if (isNil(token)) { return false; }
  const userInfo = await model.user.findOne({ token });
  return !isNil(userInfo);
};

const bulkUploadUser = async ({ dataUrl }) => {
  const usersData = await compose(
    base64XlsToJson,
    transformDataURL,
  )(dataUrl);

  const deleteUsers = 'DELETE FROM user';
  await model.sequelize.query(deleteUsers, {
    type: model.sequelize.QueryTypes.DELETE,
  });

  try {
    await model.user.bulkCreate(
      usersData,
      { fields: ['username', 'firstname', 'password', 'role'] },
    );
  } catch (err) {
    console.log(`Error ${err}`);
    return { status: false };
  }

  return { status: true };
};

export default {
  findAll,
  verifyLogin,
  verifyToken,
  bulkUploadUser,
};
