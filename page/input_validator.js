module.exports = {
  page: page
}

function page (req, res) {
  console.log('making validator page...')
  var fs = require('fs')
  fs.readFile('html/input_validator_example.html', 'utf8', function (err, html) {
    if (err) throw err
    res.end(html)
  })
}
