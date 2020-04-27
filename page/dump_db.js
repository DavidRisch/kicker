module.exports = {
  page: page
}

const tablesKeep = ['Badge']

function page (req, res) {
  const cp = require('child_process')
  const childProcess = cp.spawn('mysqldump', ['-u', process.env.DB_USER, '-p', process.env.DB_DATABASE])

  childProcess.stdin.write(process.env.DB_PASSWORD + '\n')

  let sqlDump = ''

  childProcess.stdout.on('data', (chunk) => {
    sqlDump += chunk
  })

  childProcess.on('close', (code) => {
    if (code !== 0) {
      res.writeHead(500)
      res.end('Error')
    }
    let finalSqlDump = ''
    let match
    do {
      match = /LOCK TABLES `([A-Za-z_]+)` WRITE;\n/.exec(sqlDump)
      if (match) {
        const tableName = match[1]
        if (!tablesKeep.includes(tableName)) {
          finalSqlDump += sqlDump.substr(0, match.index)
          sqlDump = sqlDump.substr(match.index + match[0].length)
          match = /UNLOCK TABLES;\n/.exec(sqlDump)
          sqlDump = sqlDump.substr(match.index + match[0].length)
          finalSqlDump += '-- REMOVED DATA OF TABLE \'' + tableName + '\' FROM DUMP\n'
        } else {
          finalSqlDump += sqlDump.substr(0, match.index + match[0].length)
          sqlDump = sqlDump.substr(match.index + match[0].length)
          match = /UNLOCK TABLES;\n/.exec(sqlDump)
          finalSqlDump += sqlDump.substr(0, match.index + match[0].length)
          sqlDump = sqlDump.substr(match.index + match[0].length)
        }
      }
    } while (match)

    res.writeHead(200, {
      'Content-Type': 'application/sql',
      'Content-Length': finalSqlDump.length,
      'Content-Disposition': 'attachment; filename=kicker.sql'
    })

    res.end(finalSqlDump)
  })
}
