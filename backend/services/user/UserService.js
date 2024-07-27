const BaseService = require('../BaseService');
const { OAuth2Client } = require('google-auth-library');

const UsersModel = require('../../models/UsersModel');
const WalkthroughModel = require('../../models/WalkthroughModel');
const { createPayload } = require('../../utils/helper')

class AuthService extends BaseService {
    constructor() {
        super();
    }

    userDetails = async (req) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1]; // Bearer <token>
            const client = new OAuth2Client(process.env.CLIENT_ID);
            if (token) {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                  });
                  const { name, email } = ticket.getPayload();
                  let user = await UsersModel.query().select('id as userId','email', 'uuid', 'username', 'role_id').where('email',email).where('is_deleted', false).first();
                  if(!user) {
                    res.sendStatus(401);
                    return;
                  } 
                  const createdWalkthrough = await this.getWalkthrough(user.userId);

                  const payload = createPayload(user, createdWalkthrough);

                  return payload;
            } else {
                res.sendStatus(401); // No token found
            }
        } catch (error) {
            return error
        }
    }

    getWalkthrough = async (userId) => {
        const createdWalkthrough = await WalkthroughModel.query().select('id as walkthroughId', 'completed as walkthroughCompleted').where('user_id', userId).first();
        return createdWalkthrough;
    }
}

module.exports = AuthService;