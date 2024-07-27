const UserService = require("../services/user/UserService");

const userDetailsAction = async (req, res, next) => {
    try {
        const service = new UserService();
        const result = await service.userDetails(req);
        res.status(200).json({
            state: true,
            message: 'User Details!',
            data: result,
        })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    userDetailsAction,
}