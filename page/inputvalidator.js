module.exports = {
    'page': page
  }
  
function page (req, res) {
    console.log('making validator page...')
    var fs = require('fs')
    fs.readFile('html/inputvalidator.html', 'utf8', function (err, html) {
        if (err) throw err
        
        res.end(html)
    })
}