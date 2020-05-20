function process (req) {
    const user = require('../src/account_util').get_current_user(req)
    if (user === null) {
        return {
            success: false,
            errorReason: 'user does not exist'
        }
    }
    let response = ''
    response = {
        success: true,
        name: user.name,
        email: user.email,
        telephone: user.telephone
    }

    return response
}

module.exports = {
    process: process
}
