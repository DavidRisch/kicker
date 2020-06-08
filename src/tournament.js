// TODO: add support for 2v2 tournaments

function createTournament (groupId, name, tournamentMode, matchMode, participants) {
  const tournament = require('./db/tournament').create(groupId, name, tournamentMode)
  participants.forEach(participant => {
    tournament.addParticipant(participant)
  })
  addRound(tournament)
  return tournament
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
      const match1 = dbMatch.create(tournament.groupId, roundId.id)
      match1.addUser(userA.id, 0)
      match1.addUser(userB.id, 1)
    }
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
