const BaseModel = require('./BaseModel');

class RolesModel extends BaseModel {
    constructor(){
        super();
    }

    static get tableName() {
        return 'roles';
    }

    static get idColumn() {
        return 'id';
    }

    static modifiers = {
        defaultSelects(query) {
            query.select('id', 'role_name');
        }
    }
}

module.exports = RolesModel;