//const User = require('../../models/RolesModel');
const BaseService = require('../BaseService');
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4 } = require('uuid');

const UsersModel = require('../../models/UsersModel');

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
                  const user = await UsersModel.query().select('email', 'uuid', 'username', 'role_id').where('email',email).where('is_deleted', false).first();
                  if(!user) {
                    const payload = {
                        username:name,
                        email,
                        role_id:2,
                        uuid: uuidv4(),
                        created_at: 'now()',
                        updated_at: 'now()',
                        is_deleted: false,
                    }
                    const createdUser = await UsersModel.query().insert(payload).returning(['id', 'email', 'username']);
                   return createdUser;
                  } else {
                    console.log("user found");
                    return user;
                  }
                  

            } else {
                res.sendStatus(401); // No token found
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = AuthService;