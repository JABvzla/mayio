module.exports.jsonWebToken = {
  token_secret: 'i-am-a-secret-token',
  options:{expiresIn: '2h'}, //see below this section for more on `options`
  default_account_status: true,
  afterSignup: function (user) {
    console.log("User account created")
  },
  afterSignin: function (user) {
    console.log("successful login")
  },
  authType: "email" //could be {email or username}
};
