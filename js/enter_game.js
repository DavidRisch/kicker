function teamAHas2ndPlayer(checkbox) { // eslint-disable-line no-unused-vars
    document.getElementById('playerA2').disabled = !checkbox.checked
}

function teamBHas2ndPlayer(checkbox) { // eslint-disable-line no-unused-vars
    document.getElementById('playerB2').disabled = !checkbox.checked
}

async function differentPlayersEntered(data) { // eslint-disable-line no-unused-vars
    // create list of entered players
    let playerIDList = [data.playerA1, data.playerA2, data.playerB1, data.playerB2]
    // remove null from list of entered players -> list of actual players
    playerIDList = playerIDList.filter(function (value, index, array) {
      return value !== null
    })
    // create set of actual players -> remove duplicate entries (little reminiscence of The Exmatriculator)
    const playerIDSet = new Set(playerIDList)
    // entered players are all different, if list of actual players contains as much elements as set of actual players
    return playerIDList.length === playerIDSet.size
}

async function Submit () { // eslint-disable-line no-unused-vars
  // collect entered data
  const data = {
    action: '',
    playerA1: document.getElementById('playerA1').value,
    playerB1: document.getElementById('playerB1').value,
    playerA2: !document.getElementById('playerA2').disabled ? document.getElementById('playerA2').value : null,
    playerB2: !document.getElementById('playerB2').disabled ? document.getElementById('playerB2').value : null,
    goalsA: document.getElementById('goalsAInput').value ? document.getElementById('goalsAInput').value : null,
    goalsB: document.getElementById('goalsBInput').value ? document.getElementById('goalsBInput').value : null
  }
  data.action = 'enterGame'

  // check if match result (goals per team) is entered
  if (data.goalsA === null || data.goalsB === null) {
    console.log('Enter a complete match result!')
    return
  }

  // check if entered players are all different
   if(await differentPlayersEntered(data)){
       const res = await apiPost(data)
       if (res.success) {
           console.log('New match was successfully added!')
       }
   }
   else{
       console.log('Choose different players!')
   }

}