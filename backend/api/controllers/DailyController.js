/**
 * DailyController
 *
 * @description :: Server-side logic for managing dailies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getByBusiness: async function (req,res) {

    let date = req.param('date');
    let business = req.param('business');

    date = date.split('/');
    let year = date[0];
    let month = date[1];
    let monthEnd = (month+1)>12? 1 : month+1;
    let yearEnd = (monthEnd===1)? year+1 : year;


    let result = await Daily.find({
      where: {business: business, date:{'>=':year+'-'+month, '<':yearEnd+'-'+monthEnd} },
      select: ["date","account", "reference", "description", "balance"]
    });

    res.send(result);
  }
};

