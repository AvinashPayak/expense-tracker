const { fetchAllRolesAction } = require('../controllers/roles.controller');

module.exports = function (app) {
    app.get('/roles/all-roles', fetchAllRolesAction);
}

