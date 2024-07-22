const BaseModel = require('./BaseModel');

class UsersModel extends BaseModel {
    constructor(){
        super();
    }

    static get tableName() {
        return 'walkthrough';
    }

    static get idColumn() {
        return 'id';
    }

    static modifiers = {
        defaultSelects(query) {
            query.select('id', 'user_id', 'completed');
        }
    }
}

module.exports = UsersModel;