module.exports.jsonWebToken = {
  token_secret: 'i-am-a-secret-token',
  options:{expiresIn: '2h'}, //see below this section for more on `options`
  default_account_status: true,
  afterSignup: function (user) {
    sails.log.info("User account created:" + user.email)

  },
  afterSignin: function (user) {
    sails.log.info("successful login:" + user.email)
  },
  authType: "email" //could be {email or username}
};
