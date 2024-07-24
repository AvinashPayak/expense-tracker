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
            const walkthrough = await Walkthrough.query().select('id').where('user_id', user.user_id).first();
            let updatedWalkthrough = {}
            const walkthroughPayload = {
                completed,
            }
            if (user && walkthrough?.id) {
                updatedWalkthrough = await Walkthrough.query().patch(walkthroughPayload).where('user_id', user.user_id).first().returning(['id as walkthroughId', 'completed as walkthroughCompleted']);
            } else {
                walkthroughPayload.user_id = user.user_id;
                updatedWalkthrough = await Walkthrough.query().insert(walkthroughPayload).where('user_id', user.user_id).first().returning(['id as walkthroughId', 'completed as walkthroughCompleted']);
            }
            return updatedWalkthrough;
        } catch (error) {
            return error
        }
    }
}

module.exports = WalkthroughService;