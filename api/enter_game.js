module.exports = {
  process: process
}

function process (req, playerA1, playerB1, playerA2, playerB2, goalsA, goalsB) {
  // take current group id
  const group = require('../src/account_util').get_group(req)

  // check, if group is actually given
  if (group === null) {
    return {
      success: false,
      errorReason: 'You are not in a group!'
    }
  }

  // create new match entry
  newMatch = require('../src/db/match').create(group, null)

  // add participating users
  newMatch.addUser(playerA1, 0)
  newMatch.addUser(playerB1, 1)
  if (playerA2 !== null) {
    newMatch.addUser(playerA2, 0)
  }
  if (playerB2 !== null) {
    newMatch.addUser(playerB2, 1)
  }

  // add match result (goals per team)
  newMatch.finish(goalsA, goalsB)

  return {
    success: true
  }
}
