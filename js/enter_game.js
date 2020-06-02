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
