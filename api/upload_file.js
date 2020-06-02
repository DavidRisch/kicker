function uploadGroupImage (req, groupID) {
// check auth
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    return { success: false, error: 'userNotAuthenticated' }
  }

  const group = require('../src/db/group').by_id(groupID)
  group.picture = req.file.buffer
}

module.exports = {
  upload_group_image: uploadGroupImage
}
