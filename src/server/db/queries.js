const knex = require('./knex');

exports.getUser = function(tableName, emailAddress, callback) {
  knex(tableName)
  .where('emailAddress', emailAddress)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};
