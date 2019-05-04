const model2Object = (sequelizeModel) => JSON.parse(JSON.stringify(sequelizeModel || {}));

export default model2Object;
