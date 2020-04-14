module.exports = init

function init (app) {
  app.get('/example', function (req, res) {
    require('./example').page(req, res)
  })

  // ^^^ Insert new pages here ^^^
}
