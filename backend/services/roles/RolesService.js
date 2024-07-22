const Roles = require('../../models/RolesModel');
const BaseService = require('../BaseService');

class RolesService extends BaseService {
    constructor() {
        super();
    }

    fetchAllRoles = async () => {
        try {
            const roles = await Roles.query().select('*').orderBy('id');
            return roles;
        } catch(error) {
            return error
        }
    }
}

module.exports = RolesService;