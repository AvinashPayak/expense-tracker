const { OAuth2Client } = require('google-auth-library');

const userAuthenticationAction = async (req, res, next) => {
    let status = 200;
    try {
        const authHeader = req?.headers?.authorization;
        const token = authHeader?.split(' ')[1]; // Bearer <token>
        const client = new OAuth2Client(process.env.CLIENT_ID);

        if (!token) {
            return res.status(401).send('Access token is missing or invalid');
        } else {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID, 
                });
                const { email_verified } = ticket?.getPayload();
                if(email_verified) next();
                else {
                    return res.status(403).send('Email not verified');
                }
            } catch (err) {
                return res.status(403).send('Token verification failed');
            }
        }
    } catch(err) {
        status = 403;
        res.sendStatus(status)
    }
}

module.exports = {
    userAuthenticationAction,
}