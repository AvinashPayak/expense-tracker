const AuthService = require("../services/auth/AuthService");

const loginUserAction = async (req, res, next) => {
    try {   
        const service = new AuthService();
        const result = await service.loginUser(req);
        res.status(200).json({
            state: true,
            message: 'User Logged In',
            data: result,
        })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    loginUserAction,
}