function page (req, res) {
  if (process.env.DEBUG_DUMMY_DB !== '1') {
    res.end('DEBUG_DUMMY_DB must be 1 to use dummy_db')
  }

  const truncateTables = ['User', 'Group', 'User_in_Group', 'Match', 'User_in_Match', 'Tournament', 'Round']
  require('../src/database').query('SET FOREIGN_KEY_CHECKS = 0;')
  for (const table of truncateTables) {
    require('../src/database').query('TRUNCATE TABLE `' + table + '`;')
  }
  require('../src/database').query('SET FOREIGN_KEY_CHECKS = 1;')

  const dbUser = require('../src/db/user')
  const dbGroup = require('../src/db/group')
  const dbMatch = require('../src/db/match')
  const srcTournament = require('../src/tournament')

  const password = 'AAAAAAAAAAAAAa1!'
  const userA = dbUser.create('user_a', 'email_a@aa.bb', '', password)
  const userB = dbUser.create('user_b', 'email_b@aa.bb', '', password)
  const userC = dbUser.create('user_c', 'email_c@aa.bb', '', password)
  const userD = dbUser.create('user_d', 'email_d@aa.bb', '', password)
  const userE = dbUser.create('user_e', 'email_e@aa.bb', '', password)

  const group1 = dbGroup.create('group_abcd', 'description group_abcd')
  group1.addUser(userA.id)
  group1.addUser(userB.id)
  group1.addUser(userC.id)
  group1.addUser(userD.id)

  const group2 = dbGroup.create('group_bcde', 'description group_bcde')
  group2.addUser(userB.id)
  group2.addUser(userC.id)
  group2.addUser(userD.id)
  group2.addUser(userE.id)

  const match1 = dbMatch.create(group1.id, null)
  match1.addUser(userA.id, 0)
  match1.addUser(userB.id, 1)
  match1.finish(1, 2)

  const match2 = dbMatch.create(group1.id, null)
  match2.addUser(userA.id, 0)
  match2.addUser(userB.id, 0)
  match2.addUser(userC.id, 1)
  match2.addUser(userD.id, 1)
  match2.finish(34, 56)

  const tournament1 = srcTournament.create_tournament(group1.id, 'tournament_a', 'DEATHMATCH')

  const matches = tournament1.rounds[0].matches
  srcTournament.add_round_if_required(tournament1)
  matches[0].finish(10, 11)
  srcTournament.add_round_if_required(tournament1)
  matches[1].finish(12, 13)
  srcTournament.add_round_if_required(tournament1)

  res.end('done')
}

module.exports = {
  page: page
}
