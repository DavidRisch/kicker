module.exports = init

function init (app) {
  const bodyParser = require('body-parser')
  var multer = require('multer')
  var upload = multer({ storage: multer.memoryStorage() })

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())

  app.post('/api', upload.single('image'), function (req, res) {
    const body = req.body
    let response = ''

    switch (body.action) {
      case 'registerCredentials': {
        response = require('./register_credentials').process(body.name, body.email, body.password, body.telephone)
        break
      }
      case 'editAccount': {
        // if password is '' the current password remains unchanged
        response = require('./edit_account').process(req, body.name, body.email, body.password, body.telephone)
        break
      }

      case 'getUserData': {
        response = require('./get_user_data').process(req)
        break
      }

      case 'login': {
        response = require('./login').process(body.userName, body.password, res)
        break
      }

      case 'validateInput': {
        var name = body.name
        var email = body.email
        var password = body.password

        var validator = require('../src/input_validator')

        response = {
          validEmail: validator.is_valid_email(email),
          validName: validator.is_valid_user_name(name),
          validPassword: validator.is_secure_password(password)
        }
        break
      }

      case 'enterGame': {
        response = require('./enter_game').process(req, body.playerA1, body.playerB1, body.playerA2, body.playerB2, body.goalsA, body.goalsB)
        break
      }

      case 'joinGroup': {
        response = require('./join_group').joinGroup(req, body.token)
        break
      }

      case 'createTournament': {
        response = require('./create_tournament').process(req, body.name, body.tournament_mode, body.match_mode, body.participants)
        break
      }

      case 'switchGroup': {
        require('./switchGroup').process(res, body.groupId)
        break
      }

      case 'createGroup': {
        response = require('./group_creation').process(req, body.groupMembers, body.groupName, body.groupDesc)
        break
      }

      case 'uploadGroupImage': {
        response = require('./upload_file').upload_group_image(req, body.group)
        break
      }

      default:
      {
        throw Error('Unknown action: ' + body.action)
      }
    }

    res.writeHead(200, { 'Content-Type': 'text/json' })
    res.end(JSON.stringify(response))
  })
}
