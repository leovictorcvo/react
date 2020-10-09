const user = require('./models/user');

const init = db => {
    user.initialUser(db)();
}

module.exports = init;