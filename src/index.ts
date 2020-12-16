import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import { errors } from 'celebrate';

const app = express();
const port = 3000;

const routes = express.Router();

app.use(cors());

app.use(express.json());

routes.get('/', (_, res) => {
  res.status(200).send({
    message: 'Welcome to the crud api! Go to /api/user to make requests',
  });
});
app.use('/api/user', userRoute);

app.use(errors());

app.listen(port);
console.log('app listening to ' + port);
