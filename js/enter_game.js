/* global $ apiPost */
var tok2 = null;

$(function () {
  tok2 = $('.player_selection').tokenize2({
    // max number of tags
    tokensMaxItems: 1,

    // allow you to create custom tokens
    tokensAllowCustom: false,

    // max items in the dropdown
    dropdownMaxItems: 10,

    // minimum/maximum of characters required to start searching
    searchMinLength: 0,
    searchMaxLength: 0,

    // specify if Tokenize2 will search from the beginning of a string
    searchFromStart: true,

    // choose if you want your search highlighted in the result dropdown
    searchHighlight: true,

    // custom delimiter
    delimiter: ';',

    // display no results message
    displayNoResultsMessage: false,
    noResultsMessageText: 'Keine Ergebnisse zu "%s" gefunden.',

    // data source
    dataSource: 'select',

    // waiting time between each search
    debounce: 0,

    // custom placeholder text
    placeholder: false,

    // enable sortable
    // requires jQuery UI
    sortable: false,

    // tabIndex
    tabIndex: 0,

    // allows empty values
    allowEmptyValues: false,

    // z-index
    zIndexMargin: 500
  })
})

function teamAHas2ndPlayer(checkbox) { // eslint-disable-line no-unused-vars
    document.getElementById('playerA2').disabled = !checkbox.checked
    // enable/disable tokenize2 instance of playerA2 explicitly
    let tok2pA2 = tok2.find(tok2p => {
      return tok2p.element[0].id === 'playerA2'
    })
    if(checkbox.checked) {
      tok2pA2.enable()
    }
    else {
      tok2pA2.clear()
      tok2pA2.disable()
    }
}

function teamBHas2ndPlayer(checkbox) { // eslint-disable-line no-unused-vars
    document.getElementById('playerB2').disabled = !checkbox.checked
    // enable/disable tokenize2 instance of playerB2 explicitly
    let tok2pB2 = tok2.find(tok2p => {
      return tok2p.element[0].id === 'playerB2'
    })
    if(checkbox.checked) {
      tok2pB2.enable()
    }
    else {
      tok2pB2.clear()
      tok2pB2.disable()
    }
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

async function validateUserInput(data) { // eslint-disable-line no-unused-vars
  // check if enabled players are entered
  if ((!document.getElementById('playerA2').disabled && !data.playerA2) || (!document.getElementById('playerB2').disabled && !data.playerB2)) {
    console.log('Enter missing players or disable them!')
    return false
  }

  // check if entered players are all different
  if(!await differentPlayersEntered(data)){
    console.log('Choose different players!')
    return false
  }

  // check if match result (goals per team) is entered
  if (data.goalsA === null || data.goalsB === null) {
    console.log('Enter a complete match result!')
    return false
  }

  return true
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

  // validate entered data
  if(!await validateUserInput(data)) {
    return
  }

  const res = await apiPost(data)
  if (res.success) {
    console.log('New match was successfully added!')
  }

}