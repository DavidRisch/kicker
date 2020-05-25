module.exports = {
  page: page
}

function page (req, res) {
  // debug function to get links for testing
  // change below params
  const host = req.protocol + '://' + req.get('host')
  const url = new URL(host + req.url)
  const group = url.searchParams.get('group')
  const groupId = require('../src/db/group').by_name(group).id
  const invite = require('../src/db/group_invitations').create(groupId).createLink(host)
  res.writeHead(200, { 'Content-Type': 'text/json' })
  res.end(JSON.stringify(invite))
  return { link: invite }
}
