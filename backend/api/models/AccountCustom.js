/**
 * AccountCustom.js
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
		account: {
			model: 'accountDefault'
		},
		business: {
			model: 'business'
		},
		name: {
			type: 'string',
			unique: true,
			required: true
		},
		status: {
			type: 'boolean',
			defaultsTo: true
		}

	}
};

