const { loginUserAction } = require('../controllers/auth.controller');

module.exports = function (app) {
    app.post('/login', loginUserAction);
}

