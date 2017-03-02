module.exports = {
  development: {
    database: 'nodeserver',
    username: 'root',
    password: null,
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
