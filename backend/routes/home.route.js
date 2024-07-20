const fs = require('fs').promises;
const knex = require('../config/db');
const { userAuthenticationAction } = require('../middleware/auth');

module.exports = function(app) {
    app.get('/', userAuthenticationAction, async (req, res) => {
        try {
            /* const data = { 
                id: 1,
                role_name: 'admin',
            }
            const response = await knex('roles').insert(data); */
            res.json({message: "Expense tracker backend is working!"});
        } catch (err) {
            console.error(err);
            res.status(500).send("Error sending data", err);
        }
    })
}