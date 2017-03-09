module.exports = {
  development: {
    database: 'db_test',
    username: 'test',
    password: '*A0E2521E77EA33EF451BF2D1025F30B925D8F2F2',
    options: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql', //mysql|sqlite|postgres|mssql
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      storage: 'path/to/database.sqlite' // SQLite only
    }
  }
}
