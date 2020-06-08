function page (req, res) {
  // get id
  const tournamentId = req.query.id
  if (!tournamentId) {
    res.writeHead(404)
    res.end()
  }

  let tournament
  try {
    tournament = require('../src/db/tournament').by_id(tournamentId)
  } catch (e) {
    res.writeHead(404)
    res.end()
  }

  // get corresponding matches
  const matches = []
  const rounds = tournament.rounds
  rounds.forEach(round => {
    matches.push(round.matches[0])
  })

  // create match objects for rendering (players, score)
  const outstandingMatches = []
  const finishedMatches = []
  matches.forEach(match => {
    const block = {
      playerA1: match.usersOfTeam(0)[0].name,
      playerB1: match.usersOfTeam(1)[0].name,
      matchMode: match.mode,
      id: match.id
    }
    if (match.mode === '2v2') {
      block.playerA2 = match.usersOfTeam(0)[1].name
      block.playerB2 = match.usersOfTeam(1)[1].name
    }
    if (match.isFinished) {
      block.scoreA = match.goalsA
      block.scoreB = match.goalsB
      block.finishDate = match.finishedTimestamp
      finishedMatches.push(block)
    } else {
      outstandingMatches.push(block)
    }
  })

  // create users for tabluar display (rank, name, points, played games)
  const users = []
  const userIds = tournament.getParticipants()
  userIds.forEach(userId => {
    const user = require('../src/db/user').by_id(userId)
    users.push({ name: user.name })
  })

  // get current round
  const round = 1
  // get own rank
  const rank = 1

  // ejs
  const ejs = require('ejs')
  const htmlPromise = ejs.renderFile('views/tournament_main.ejs', {
    outstandingMatches: outstandingMatches,
    finishedMatches: finishedMatches,
    users: users,
    ownRank: rank,
    round: round
  })

  const html = require('deasync-promise')(htmlPromise) // https://www.npmjs.com/package/deasync-promise

  res.end(require('../src/html_creator').create_html(html, {
    title: tournament.name,
    js: ['running_tournament'],
    css: ['styles_general', 'row'],
    nav: true,
    req: req
  }))
}

module.exports = {
  page: page
}
