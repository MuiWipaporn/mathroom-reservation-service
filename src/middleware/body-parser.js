import bodyParser from 'body-parser';

const bodyParserConfig = (config) => (req, res, next) => {
  bodyParser.json({
    limit: config.bodyLimit,
  })(req, res, (err) => {
    if (err) {
      const { name: type, message, status } = err;
      return res.status(status).send({ type, message });
    }
    next();
  });
};

export default bodyParserConfig;
