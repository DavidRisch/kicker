function process (req, name, tournamentMode, matchMode, participants) {
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
