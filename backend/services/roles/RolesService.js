const Roles = require('../../models/RolesModel');
const BaseService = require('../BaseService');

class RolesService extends BaseService {
    constructor() {
        super();
    }

    fetchAllRoles = async () => {
        try {
            console.log("fetchAllRoles");
            const roles = await Roles.query().select('*').orderBy('id');
            console.log("roles", roles);
            return roles;
        } catch(error) {
            return error
        }
    }
}

module.exports = RolesService;