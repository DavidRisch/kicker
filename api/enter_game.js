module.exports = {
  process: process
}

function process (req, playerA1, playerB1, playerA2, playerB2, goalsA, goalsB) {
  const group = require('../src/account_util').get_group(req)

  if (group === null) {
    return {
      success: false,
      errorReason: 'no group'
    }
  }
}
