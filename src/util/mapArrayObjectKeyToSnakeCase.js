import { snakeCase, map, mapKeys } from 'lodash/fp';

const mapArrayObjectKeyToSnakeCase = (objects) => map(object => mapKeys(snakeCase)(object))(objects);

export default mapArrayObjectKeyToSnakeCase;
