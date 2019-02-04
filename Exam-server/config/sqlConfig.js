const DBConnection = {
  user: 'admin',
  password: 'admin',
  server: 'localhost',
  database: 'Exam',
  pool: {
    min: 2
  }
  //   options: {
  //     encrypt: true // Use this if you're on Windows Azure
  //   }
};

module.exports = DBConnection;
