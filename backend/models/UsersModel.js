const BaseModel = require('./BaseModel');

class UsersModel extends BaseModel {
    constructor(){
        super();
    }

    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }

    static modifiers = {
        defaultSelects(query) {
            query.select('id', 'username', 'primary_email');
        }
    }
}

module.exports = UsersModel;