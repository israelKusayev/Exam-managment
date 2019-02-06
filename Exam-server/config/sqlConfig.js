const DBConnection = {
  user: 'admin',
  password: '1234',
  server: 'localhost',
  database: 'Exam',

  pool: {
    min: 2
  },
  options: {
    encrypt: true,
    instanceName: 'SQLEXPRESS'
  }
};

module.exports = DBConnection;
