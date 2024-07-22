const { updateWalkthroughAction } = require('../controllers/walkthrough.controller');
const { userAuthenticationAction } = require('../middleware/auth');

module.exports = function (app) {
    app.post('/update-walkthrough', userAuthenticationAction, updateWalkthroughAction);
}

