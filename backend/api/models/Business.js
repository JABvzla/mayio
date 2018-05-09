/**
 * Business.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: 'string'
        },
        status: {
            type: 'boolean',
            defaultsTo: true
        },
        users: {
        	collection: 'user',
        	via: 'businesses'
        },
        accounts: {
            collection: 'accountCustom',
            via: 'business'
        }
    }
};
