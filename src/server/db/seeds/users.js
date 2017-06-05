
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({emailAddress: 'bippetyboppetyboo@gmail.com', password: 'apples1234', firstName: 'Richard', lastName: 'Simmons'})
      ]);
    });
};
