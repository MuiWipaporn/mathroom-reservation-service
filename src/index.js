import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import express from 'express';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import requestContext from 'request-context';
import session from 'express-session';
import bodyParserMiddleware from './middleware/body-parser';
import controller from './controller';
import config from './config';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.use(session({
  secret: 'math-booking',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(requestContext.middleware('request'));
app.use(compression());
app.use(bodyParserMiddleware(config));
app.use(cors());

const swaggerJSDocOptions = {
  swaggerDefinition: {
    info: {
      title: 'Math Booking',
      version: '1.0.0',
    },
    basePath: '/api/',
  },
  apis: ['./src/controller/*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', controller);
console.log('Enable swagger');
server.listen(port, () => {
  console.log('API LISTENNING ON PORT 3000');
});

export default app;
