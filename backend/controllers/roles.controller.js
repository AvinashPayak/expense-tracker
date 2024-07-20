const RolesService = require("../services/roles/RolesService");

const fetchAllRolesAction = async (req, res, next) => {
    try {   
        const service = new RolesService();
        const result = await service.fetchAllRoles();
        res.status(200).json({
            state: true,
            message: 'All Roles',
            data: result,
        })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    fetchAllRolesAction,
}