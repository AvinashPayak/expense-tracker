//const User = require('../../models/RolesModel');
const BaseService = require('../BaseService');
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4 } = require('uuid');

const UsersModel = require('../../models/UsersModel');
const WalkthroughModel = require('../../models/WalkthroughModel');
const { loginType } = require('../../constants/user');

class AuthService extends BaseService {
    constructor() {
        super();
    }

    loginUser = async (req) => {
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
                  let createWalkthrough = false;
                  if(!user) {
                    user = await this.createUser(name, email)
                    createWalkthrough = true;
                  } 
                  const createdWalkthrough = await this.createWalkthrough(user.userId, createWalkthrough);
                  const payload = this.createPayload(user, createdWalkthrough);
                  return payload;
            } else {
                res.sendStatus(401); // No token found
            }
        } catch (error) {
            return error
        }
    }

    createUser = async (name, email) => {
        const payload = {
            username:name,
            email,
            role_id:2,
            uuid: uuidv4(),
            created_at: 'now()',
            updated_at: 'now()',
            is_deleted: false,
        }
        const createdUser = await UsersModel.query().insert(payload).returning(['id as userId', 'uuid', 'email', 'username', 'role_id']);
        return createdUser;
    }

    createWalkthrough = async (userId, createWalkthrough) => {
        let createdWalkthrough = {};
        if(createWalkthrough) {
            const walkthroughPayload = {
                user_id: userId,
                completed: false,
            }
            createdWalkthrough = await WalkthroughModel.query().insert(walkthroughPayload).returning(['id as walkthroughId', 'completed as walkthroughCompleted']);
        } else {
            createdWalkthrough = await WalkthroughModel.query().select('id as walkthroughId', 'completed as walkthroughCompleted').where('user_id', userId).first();
        }
        return createdWalkthrough;
    }

    createPayload = (...payloads) => {
        return Object.assign({}, ...payloads);
    }
    
}

module.exports = AuthService;