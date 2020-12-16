import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('idUser').primary();
    table.string('nameUser', 100).notNullable();
    table.string('surnameUser', 100).notNullable();
    table.string('emailUser', 150).notNullable();
    table.string('passwordUser', 32).notNullable();
    table.bigInteger('phoneUser').notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('user');
}
