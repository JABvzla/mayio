/**
 * Daily.js
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
        date: {
            type: 'date'
        },
        account: {
			model: 'accountDefault'
        },
		reference: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		balance: {
			type: 'float'
		},
		status: {
			type: 'boolean',
			defaultsTo: true
		}
	}
};

