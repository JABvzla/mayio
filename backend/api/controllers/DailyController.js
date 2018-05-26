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

    let business = req.param('business');
    let account = req.param('account');
    let startDate = new Date(req.param('startdate'));
    let endDate = new Date(req.param('enddate'));

    startDate = startDate.toLocaleDateString();
    endDate = endDate.toLocaleDateString();

    await Daily.query(`
        SELECT
          d.date,
          d.reference,
          d.description,
          CASE WHEN d.balance < 0 THEN d.balance ELSE 0 END AS debits,
          CASE WHEN d.balance > 0 THEN d.balance ELSE 0 END AS credits,
          SUM( (
                  SELECT CASE WHEN SUM(daily.balance) THEN SUM(daily.balance) ELSE 0 END FROM daily
                  WHERE daily.account = ${account}
                    AND daily.business = ${business}
                    AND daily.date <= "${startDate}"
               ) +
               cumulative.balance) AS total
        FROM daily d

        INNER JOIN daily cumulative
          ON d.id >= cumulative.id
          AND cumulative.account = ${account}
          AND cumulative.business = ${business}
          AND cumulative.date > "${startDate}" AND cumulative.date <= "${endDate}"

        WHERE d.account = ${account}
          AND d.business = ${business}
          AND d.date > "${startDate}" AND d.date <= "${endDate}"
        GROUP BY d.id,
                 d.balance
        ORDER BY d.createdAt ASC;
      `, (err, rawResult) => {
        Daily.findOne({
          where: {
            business: business,
            account: account,
            date: {"<" : endDate}
          },
        }).sum('balance').groupBy('account').then(r=>{
          rawResult.push(r);
          res.ok(rawResult);
        });
    });
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
          a.*,
          CASE WHEN b.balanceBefore THEN b.balanceBefore ELSE 0 END AS balanceBefore,
          CASE WHEN b.balanceBefore THEN b.balanceBefore + a.totalMonth ELSE a.totalMonth END AS total
        FROM (
          SELECT
            account.id,
            account.name,
            accountsection.name AS section,
            SUM(CASE WHEN daily.balance < 0 THEN daily.balance ELSE 0 END) AS debits,
            SUM(CASE WHEN daily.balance > 0 THEN daily.balance ELSE 0 END) AS credits,
            SUM(daily.balance) AS totalMonth
          FROM daily, account, accountsection
          WHERE account.id = daily.account
            AND accountsection.id = account.section
            AND daily.date > "${startDate}" AND daily.date <= "${endDate}"
            AND daily.business=${business}
          GROUP BY daily.account) a
        LEFT JOIN (
          SELECT daily.account AS id, SUM(daily.balance) AS balanceBefore
          FROM daily, account
            WHERE account.id = daily.account AND daily.date < "${endDate}" AND daily.business=${business}
          GROUP BY daily.account) b
        ON a.id = b.id
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
