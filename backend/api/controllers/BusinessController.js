/**
 * BusinessController
 *
 * @description :: Server-side logic for managing businesses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  test: async function(req, res)
  {
    var user = await User.find({ username: "jabvzla" });

    var newClass = {
      name: "Jose",
      lastName: "Bonito",
      user: user,
    };
    res.send(newClass);

	}
};
