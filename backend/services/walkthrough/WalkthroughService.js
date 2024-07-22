const UsersModel = require('../../models/UsersModel');
const Walkthrough = require('../../models/WalkthroughModel');
const BaseService = require('../BaseService');

class WalkthroughService extends BaseService {
    constructor() {
        super();
    }

    updateWalkthrough = async (walkthroughCompleted) => {
        try {
            const { uuid, completed } = walkthroughCompleted;
            const user = await UsersModel.query().select('id as user_id').where('uuid', uuid).first();
            let updatedWalkthrough = {}
            if(user) {
                const walkthroughPayload = {
                    completed,
                }
                updatedWalkthrough = await Walkthrough.query().patch(walkthroughPayload).where('user_id', user.user_id).first().returning(['id as walkthroughId', 'completed as walkthroughCompleted']);

            } else {
                throw new Error("User not found");
            }
            return updatedWalkthrough;
        } catch(error) {
            return error
        }
    }
}

module.exports = WalkthroughService;