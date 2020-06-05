// helper functions

function setCheckbox(id, checked) {
    const element = document.getElementById(id) // textinput A
    element.checked = checked
}

function teamAHas2ndPlayer(checkbox) { // eslint-disable-line no-unused-vars
    document.getElementById('playerA2').disabled = !checkbox.checked;
}

function teamBHas2ndPlayer(checkbox) { // eslint-disable-line no-unused-vars
    document.getElementById('playerB2').disabled = !checkbox.checked;
}

function differentPlayers(data) { // eslint-disable-line no-unused-vars
    if(data.playerA2 === null || data.playerB2 === null){
        if(data.playerA1 === data.playerB1)
            return false;
    }
    let playerList = [data.playerA1, data.playerA2, data.playerB1, data.playerB2];
    const playerIDSet = new Set(playerList);
    playerIDSet.delete(null);
    let participantCount = 0;
    playerList.forEach(function (item,index ) {
        console.log(item,index);
        if (item !== null) {
            ++participantCount;
        }
    });
    console.log(participantCount);
    return playerIDSet.size === participantCount;
}
async function Submit () { // eslint-disable-line no-unused-vars
    console.log('In Submit()');
  const data = {
    action: '',
    playerA1: document.getElementById('playerA1').value,
    playerB1: document.getElementById('playerB1').value,
    playerA2: !document.getElementById('playerA2').disabled ? document.getElementById('playerA2').value : null,
    playerB2: !document.getElementById('playerB2').disabled ? document.getElementById('playerB2').value : null,
    goalsA: document.getElementById('goalsAInput').value,
    goalsB: document.getElementById('goalsBInput').value
  }
   if( differentPlayers(data)){
       const res = await apiPost(data)
       if (res.success) {
           console.log('Enter game success')
       }
   }
   else{
       console.log('Chose different players')
   }

}