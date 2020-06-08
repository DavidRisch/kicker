function process (req, name, tournamentMode, matchMode, participants) {
  const user = require('../src/account_util').get_current_user(req)
  if (user === null) {
    return {
      success: false,
      errorReason: 'login failed'
    }
  }
  // TODO: validate

  const groupId = require('../src/account_util').get_group(req)
  const tournament = require('../src/tournament').create_tournament(groupId, name, tournamentMode, matchMode, participants)

  return {
    success: true,
    tournament_id: tournament.id
  }
}

module.exports = {
  process: process
}
