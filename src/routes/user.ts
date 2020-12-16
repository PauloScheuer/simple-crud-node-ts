import express from 'express';
import { celebrate, Joi } from 'celebrate';
import user from '../controllers/userController';

const routes = express.Router();

//rotas do usuário

routes.post(
  '/create',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().max(100),
        surname: Joi.string().required().max(100),
        email: Joi.string().required().max(150),
        password: Joi.string().required().max(32),
        phone: Joi.number().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  user.createUser
);

routes.delete(
  '/delete/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  user.deleteUser
);
routes.get('/index', user.indexUsers);
routes.get(
  '/show/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  user.showUser
);
routes.put(
  '/edit/:id',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().max(100),
        surname: Joi.string().required().max(100),
        email: Joi.string().required().max(150),
        password: Joi.string().required().max(32),
        phone: Joi.number().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  user.editUser
);

export default routes;
