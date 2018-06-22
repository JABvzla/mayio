/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  me: function (req,res) {
    sails.log.info('Mayio api running with sails');
    res.send('Mayio api running with sails');
  }
};

