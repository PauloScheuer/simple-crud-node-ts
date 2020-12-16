import knex from '../database/connection';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, phone } = req.body;
    const data = {
      nameUser: name,
      surnameUser: surname,
      emailUser: email,
      passwordUser: password,
      phoneUser: phone,
    };

    //verifica se já tem um usuário com esse email

    const testEmail = await knex('user')
      .select('*')
      .where('emailUser', '=', email);

    if (testEmail.length > 0) {
      throw new Error('Email já cadastrado');
    }

    //verifica se já tem um usuário com esse numero de telefone

    const testPhone = await knex('user')
      .select('*')
      .where('phoneUser', '=', phone);

    if (testPhone.length > 0) {
      throw new Error('Número de telefone já cadastro');
    }

    await knex('user').insert(data);

    res.status(200).send({ message: 'Usuário criado' });
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Erro na criação do usuário', error: error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await knex('user').delete().where('idUser', '=', id);
    res.status(200).send({ message: 'Usuário deletado' });
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Erro na exclusão do usuário', error: error });
  }
};

const indexUsers = async (req: Request, res: Response) => {
  try {
    const users = await knex('user').select('*');
    res.status(200).send({ message: 'Usuários listados', result: users });
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Erro na listagem de usuários', error: error });
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await knex('user').select('*').where('idUser', '=', id);

    if (user.length === 0) {
      throw new Error('Usuário inexistente');
    }

    res.status(200).send({ message: 'Usuário encontrado', result: user });
  } catch (error) {
    res.status(400).send({ message: 'Erro ao procurar usuário', error: error });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, surname, email, password, phone } = req.body;
    const data = {
      nameUser: name,
      surnameUser: surname,
      emailUser: email,
      passwordUser: password,
      phoneUser: phone,
    };

    await knex('user').update(data).where('idUser', '=', id);

    res.status(200).send({ message: 'Usuário editado' });
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Erro na edição do usuário', error: error });
  }
};

export default {
  createUser,
  deleteUser,
  showUser,
  indexUsers,
  editUser,
};
