//TODO: isn't it express stuff?
module.exports.auth = function (req, res, next) {
  User.findOne({ login: req.body.login, password: req.body.password }, function(err, model) {
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
