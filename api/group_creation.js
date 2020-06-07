function process (req, groupMembers, groupName, groupDesc) {
  // get current user
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    // user not authenticated
    return { success: false, error: 'userNotAuthenticated' }
  }

  const groupManager = require('../src/db/group')

  try {
    const group = groupManager.create(groupName, groupDesc)
    groupMembers.forEach(user => {
      group.addUser(user)
    })
    return { success: true, group: group }
  } catch (e) {
    if (e instanceof groupManager.DuplicateGroupException) {
      return { success: false, error: 'duplicateGroupName' }
    } else {
      return { success: false, error: e.message }
    }
  }
}

module.exports = {
  process: process
}
