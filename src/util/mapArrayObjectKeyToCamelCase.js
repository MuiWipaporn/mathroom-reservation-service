import { camelCase, map, mapKeys } from 'lodash/fp';

const mapArrayObjectKeyToCamelCase = (objects) => map(object => mapKeys(camelCase)(object))(objects);

export default mapArrayObjectKeyToCamelCase;
