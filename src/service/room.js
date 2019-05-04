import { compose, map } from 'lodash/fp';
import model from '../model';
import {
  transformDataURL,
  base64XlsToJson,
  mapArrayObjectKeyToCamelCase,
} from '../util';

const findAll = async () => {
  const result = await model.room.findAll();
  return result;
};

const bulkUploadRooms = async ({ dataUrl }) => {
  const roomsData = await compose(
    base64XlsToJson,
    transformDataURL,
  )(dataUrl);

  // 1. delete all room table
  const nativeSql = 'DELETE FROM room';
  await model.sequelize.query(nativeSql, {
    type: model.sequelize.QueryTypes.DELETE,
  });

  // 2. set default value
  const filteredData = map(
    ({ roomName, floor, capacity, type, status }) => ({
      roomName,
      floor,
      capacity: capacity !== '' ? capacity : 0,
      type,
      status,
    }))(mapArrayObjectKeyToCamelCase(roomsData));

  // 3. bulk insert to db
  try {
    await model.room.bulkCreate(
      filteredData,
      { fields: ['roomName', 'floor', 'capacity', 'type', 'status'] },
    );
    return { status: true };
  } catch (errorMessage) {
    console.log(`Error ${errorMessage}`);
  }
  return { status: false };
};

export default {
  findAll,
  bulkUploadRooms,
};
