module.exports = {
  'query': query,
  'query_async': query_async
}

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

connection.config.queryFormat = function (query, values) {
  // From https://stackoverflow.com/a/15779796
  if (!values) return query
  return query.replace(/:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key])
    }
    return txt
  }.bind(this))
}

function query (statement, values) {
  let result = null
  connection.query(statement, values, function (err, rows) {
    if (err) {
      throw new Error('MySql error: ' + err.stack)
    }

    result = rows
  })
  require('deasync').loopWhile(function () {return result === null})
  return result
}

function query_async (statement, values, callback) {
  connection.query(statement, values, function (err, rows) {
    if (err) {
      throw new Error('MySql error: ' + err.stack)
    }

    callback(rows)
  })
}
