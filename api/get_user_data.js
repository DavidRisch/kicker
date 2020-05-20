function process (req) {
    const user = require('../src/account_util').get_current_user(req)

    let response = ''
    response = {
        name: user.name,
        email: user.email,
        telephone: user.telephone
    }

    return response
}

module.exports = {
    process: process
}
