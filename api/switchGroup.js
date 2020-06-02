module.exports = {
  process: handle
}

function handle (res, groupId) {
  require('../src/account_util').set_group(res, groupId)
}
