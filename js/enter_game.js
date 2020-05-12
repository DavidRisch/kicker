function oneVsOne () {
  console.log('1 vs 1')

  // toggle buttons
  var button = document.getElementById('2v2')
  button.disabled = false

  button = document.getElementById('1v1')
  button.disabled = true

  // disable inputs for second players
  var secondPlayers = document.getElementById('playerA2')
  secondPlayers.style.display = 'none'
  secondPlayers = document.getElementById('playerB2')
  secondPlayers.style.display = 'none'
}

function twoVsTwo () {
  console.log('2 vs 2')

  // toggle buttons
  var button = document.getElementById('1v1')
  button.disabled = false

  button = document.getElementById('2v2')
  button.disabled = true

  // enable inputs for second players
  var secondPlayers = document.getElementById('playerA2')
  secondPlayers.style.display = 'inline'
  secondPlayers = document.getElementById('playerB2')
  secondPlayers.style.display = 'inline'
}


