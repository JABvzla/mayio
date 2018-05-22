/**
 * DailyController
 *
 * @description :: Server-side logic for managing dailies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getByBusiness: async function (req, res) {

    let startDate = new Date(req.param('date'));
    let business = req.param('business');
    let endDate = new Date(startDate);

    endDate.setMonth(endDate.getMonth()+1);

    let result = await Daily.find({
      where: {business: business, date:{'>=': startDate.toLocaleDateString(), '<':endDate.toLocaleDateString()} },
      select: ["date","account", "reference", "description", "balance"]
    });

    res.send(result);
  },

  majorAnalytic: async function(req, res) {
    res.send('major');
  },

  checkupBalance: async function(req, res) {
    let business = req.param('business');
    let endDate = new Date(req.param('enddate'));
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate()-1);

    startDate = startDate.toLocaleDateString();
    endDate = endDate.toLocaleDateString();

    await Daily.query(`
        SELECT
          account.name,
          accountsection.name as section,
          CASE WHEN b.account=account.id THEN b.balanceBefore else 0 END as balanceBefore,
          SUM(case when daily.balance < 0 then daily.balance else 0 end) as debits,
          SUM(case when daily.balance > 0 then daily.balance else 0 end) as credits,
          SUM(daily.balance) as totalMonth,
          SUM(daily.balance) +  CASE WHEN b.account=account.id THEN b.balanceBefore else 0 END  as total
        FROM daily, account, accountsection,
          (
            SELECT daily.account ,SUM(daily.balance) as balanceBefore
            FROM daily, account
            WHERE  account.id = daily.account AND daily.date < "${endDate}" AND daily.business=${business}
            GROUP BY daily.account
          ) as b
        WHERE account.id = daily.account
              AND accountsection.id = account.section
              AND daily.date > "${startDate}" AND daily.date <= "${endDate}"
              AND daily.business=1
        GROUP BY daily.account, b.account;
      `, (err, rawResult) => {

        let result = {};

        rawResult.forEach(item =>{
          const key = item.section;
          item.section = undefined;
          result[key]? result[key].push(item) : result[key] = [item];
        });

        res.ok(result);
      });

  }
};
