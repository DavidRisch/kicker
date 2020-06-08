function createTournament (groupId, name, tournamentMode, matchMode, participants) {
  const tournament = require('./db/tournament').create(groupId, name, tournamentMode)
  participants.forEach(participant => {
    tournament.addParticipant(participant)
  })
  // create matches
  if (tournamentMode === 'DEATHMATCH') {
    buildDeathmatchTournament(tournament, matchMode)
  } else {
    addRound(tournament)
  }
  return tournament
}

function buildDeathmatchTournament (tournament, matchMode) {
  const dbMatch = require('../src/db/match')
  const combinatorics = require('js-combinatorics') // https://www.npmjs.com/package/js-combinatorics
  const shuffle = require('shuffle-array') // https://www.npmjs.com/package/shuffle-array
  const participants = tournament.getParticipants()

  if (matchMode === '1v1') {
    const cmb = combinatorics.combination(participants, 2)
    const i = 0
    while (userPair = cmb.next()) { // eslint-disable-line no-cond-assign, no-undef
      const round = require('../src/db/round').create(tournament.id)
      const match = dbMatch.create(tournament.groupId, round.id, tournament.id)
      match.addUser(userPair[0], 0) // eslint-disable-line no-undef
      match.addUser(userPair[1], 1) // eslint-disable-line no-undef
    }
  } else if (matchMode === '2v2') {
    // check length
    if (participants % 4 !== 0) {
      // TODO error handling
    }
    // shuffle to create random teams
    shuffle(participants)
    // create matches
    for (let i = 0; i < participants.length; i += 4) {
      const round = require('../src/db/round').create(tournament.id)
      const match = dbMatch.create(tournament.groupId, round.id, tournament.id)
      match.addUser(participants[i], 0)
      match.addUser(participants[i + 1], 0)
      match.addUser(participants[i + 2], 1)
      match.addUser(participants[i + 3], 1)
    }
  }
}

function addRound (tournament) {
  const dbMatch = require('../src/db/match')

  const previousRounds = tournament.rounds

  const roundId = tournament.addRound()

  if (tournament.mode === 'KO') {
    let remainingUsers = tournament.getParticipants()
    for (const round of previousRounds) {
      for (const match of round.matches) {
        if (match.goalsA > match.goalsB) {
          remainingUsers = remainingUsers.filter(function (value, index, arr) {
            return value.id !== match.usersOfTeam(1)[0].id
          })
        } else if (match.goalsA < match.goalsB) {
          remainingUsers = remainingUsers.filter(function (value, index, arr) {
            return value.id !== match.usersOfTeam(0)[0].id
          })
        }
      }
    }

    for (let i = 0; i + 1 < remainingUsers.length; i += 2) {
      const userA = remainingUsers[i]
      const userB = remainingUsers[i + 1]
      const match1 = dbMatch.create(tournament.groupId, roundId.id, tournament.id)
      match1.addUser(userA.id, 0)
      match1.addUser(userB.id, 1)
    }
  } else if (tournament.mode === 'SWISS') {
    // TODO implement swiss matchmaking
  }
}

function addRoundIfRequired (tournament) {
  const rounds = tournament.rounds
  const latestRound = rounds[rounds.length - 1]
  const matches = latestRound.matches

  let allFinished = true

  for (const match of matches) {
    if (!match.isFinished) {
      allFinished = false
    }
  }

  if (allFinished) {
    addRound(tournament)
  }
}

module.exports = {
  create_tournament: createTournament,
  add_round_if_required: addRoundIfRequired
}
