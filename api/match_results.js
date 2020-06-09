function submitMatchResults (req, matchId, goalsA, goalsB) {
// check auth
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    return { success: false, error: 'userNotAuthenticated' }
  }

  const match = require('../src/db/match').by_id(matchId)
  match.finish(goalsA, goalsB)
  return { success: true }
}

module.exports = {
  submit_match_results: submitMatchResults
}
