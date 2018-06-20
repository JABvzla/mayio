/**
 * AccountSectionController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getWithAccounts: async function (req, res) {
    await AccountSection.find({select: ["id","name"]}).then(sections =>
      Account.find({select: ["id","name","section"]}).then(accounts => {
        sections.map(s=> s.accounts = accounts.filter(a=> a.section === s.id) );
        res.send(sections);
      })
    );
  }
};
