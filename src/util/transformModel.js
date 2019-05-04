import { mapValues, snakeCase } from 'lodash/fp';

const mapValuesWithKey = mapValues.convert({ cap: false });

const tranformKeyToField = (value, key) => ({
  ...value,
  field: value.field || snakeCase(key),
});

export default mapValuesWithKey(tranformKeyToField);
