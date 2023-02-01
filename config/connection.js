const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialnetworkapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;