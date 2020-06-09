/* global apiPost, location, prompt, alert */

window.onload = function () {
  document.getElementsByName('submitMatchButton').forEach(button => {
    button.onclick = EnterGameScores
  })
}

async function EnterGameScores () { // eslint-disable-line no-unused-vars
  // temporary popup to get values
  let goalsA
  let goalsB

  // get only numbers
  do {
    goalsA = parseInt(prompt('Punkte Team A:'))
  } while (goalsA !== null && isNaN(goalsA))

  do {
    goalsB = parseInt(prompt('Punkte Team B:'))
  } while (goalsB !== null && isNaN(goalsB))

  const parentDiv = this.parentNode
  const input = parentDiv.querySelector('input[name="matchId"]')
  const matchId = input.value
  const res = await apiPost({
    action: 'submitMatchResults',
    goalsA: goalsA,
    goalsB: goalsB,
    matchId: matchId
  })

  if (res.success === true) {
    // update page by reloading
    location.reload()
  } else {
    // show error in popup (for now)
    alert(res.error)
  }
}
