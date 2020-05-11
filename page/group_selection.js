module.exports = {
  page: page
}

function getGroupArrayAsSnapshotJsonString (groupArray) {
  const groupSnapshotArray = []
  for (let i = 0; i < groupArray.length; i++) {
    const group = groupArray[i]
    groupSnapshotArray.push({ id: group.id, name: group.name, description: group.description })
  }
  return groupSnapshotArray
}
function page (req, res) {
  console.log('making group selection page...')

  const groupArray = require('../src/db/group').get_all()

  // only display 10 groups
  const maxGroupCount = 10
  const groupSnapshotJSONString = getGroupArrayAsSnapshotJsonString(groupArray.slice(0, maxGroupCount))

  // pack our group snapshot array into a javascript tag as json string
  const groupSnapshotAsJSTag = '<script> var groupSnapshot = ' + groupSnapshotJSONString + '</script>'

  var fs = require('fs')
  fs.readFile('html/select_group.html', 'utf8', function (err, html) {
    if (err) throw err
    const combinedHTML = groupSnapshotAsJSTag + html

    res.end(require('../src/html_creator').create_html(combinedHTML, 'TEST'))
  })
}
