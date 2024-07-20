const { OAuth2Client } = require('google-auth-library');

const userAuthenticationAction = async (req, res, next) => {
    let status = 200;
    try {
        const authHeader = req?.headers?.authorization;
        const token = authHeader?.split(' ')[1]; // Bearer <token>
        console.log("token", token);
        const client = new OAuth2Client(process.env.CLIENT_ID);
       
        if (token) {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID, 
                });
                const { email_verified } = ticket?.getPayload();
                if(email_verified) next();
            } catch (err) {
                status = 403;
            }
        } else {
                status = 401;
        }
        res.sendStatus(status)
    } catch(err) {
        status = 403;
        res.sendStatus(status)
    }
}

module.exports = {
    userAuthenticationAction,
}