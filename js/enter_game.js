// helper functions
function hideElment(id, hide) {
    const element = document.getElementById(id) // textinput A
    if (hide) {
        element.style.display = 'none'
    } else {
        element.style.display = 'inline'
    }
}

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

async function Submit () { // eslint-disable-line no-unused-vars
  data = {
    action: '',
    playerA1: document.getElementById('playerA1').value,
    playerB1: document.getElementById('playerB1').value,
    playerA2: !isADisabled ? document.getElementById('playerA2').value : null,
    playerB2: !isBDisabled ? document.getElementById('playerB2').value : null,
    goalsA: document.getElementById('goalsAInput').value,
    goalsB: document.getElementById('goalsBInput').value
  }

  data.action = 'enterGame'
  const res = await apiPost(data)
  if (res.success) {
    console.log('Enter game success')
  }
}