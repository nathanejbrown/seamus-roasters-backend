exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('emailAddress').notNullable();
    table.string('password').notNullable();
    table.string('firstName');
    table.string('lastName');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
