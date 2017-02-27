let models = require('./../models');
let User = models.Users;

module.exports.auth = async function (ctx, next) {
  Users.findOne({ login: this.login, password: this.password }, function(err, model) {
    if (err) throw err
    if(model) {
      res.send(model._id);
      Auth.userService.isConnected = true;
      res.end();
    }
    else {
      res.writeHead(401,{
        'Content-Type': 'text/plain'
      });
      res.write("Wrong Login or Password");
      res.end();
    }
  });
}
