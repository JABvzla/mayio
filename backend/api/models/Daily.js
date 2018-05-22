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
      business: {
        model: 'business',
        required: true
      },
      date: {
          type: 'date',
          required: true
      },
      account: {
			    model: 'account',
          required: true
      },
      reference: {
          type: 'string'
      },
      description: {
          type: 'string'
      },
      balance: {
          type: 'float',
          required: true
      },
      status: {
        type: 'boolean',
        defaultsTo: true
		}
	}
};

