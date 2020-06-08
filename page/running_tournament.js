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

  // create match objects for rendering
  const outstandingMatches = []
  const finishedMatches = []
  matches.forEach(match => {
    if (match.isFinished) {
      finishedMatches.push({
        playerA: match.usersOfTeam(0)[0].name,
        playerB: match.usersOfTeam(1)[0].name,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        finishTs: match.finishedTimestamp
      })
    } else {
      outstandingMatches.push({
        playerA: match.usersOfTeam(0)[0].name,
        playerB: match.usersOfTeam(1)[0].name
      })
    }
  })

  // create users for tabluar display

  // ejs
  const ejs = require('ejs')
  const htmlPromise = ejs.renderFile('views/tournament_main.ejs', {
    outstandingMatches: outstandingMatches,
    finishedMatches: finishedMatches
  })

  const html = require('deasync-promise')(htmlPromise) // https://www.npmjs.com/package/deasync-promise

  res.end(require('../src/html_creator').create_html(html, {
    title: tournament.name,
    css: ['styles_general', 'row'],
    nav: true,
    req: req
  }))
}

module.exports = {
  page: page
}
