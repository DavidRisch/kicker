const user = require('./db/user')

let template = null
require('fs').readFile('html/match_row.html', 'utf8', function (err, html) {
  if (err) throw err
  template = html
})

function createRow (match) {
  // wait until template is loaded
  require('deasync').loopWhile(function () { return template === null })

  let matchRow = template
  matchRow = matchRow.replace('§date§', match.finishedTimestamp)
  matchRow = matchRow.replace('§a_score§', match.goalsA)
  matchRow = matchRow.replace('§b_score§', match.goalsB)

  const teams = [[], []]
  const users = match.users
  for (const row of users) {
    const usr = user.by_id(row.user_id)
    teams[row.team].push(usr.name)
  }

  matchRow = matchRow.replace('§a_name§', teams[0].join('\n'))
  matchRow = matchRow.replace('§b_name§', teams[1].join('\n'))

  return matchRow
}

module.exports = {
  create_row: createRow
}
