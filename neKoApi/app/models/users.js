var thinky = require('thinky')();
var type = thinky.type;
var r = thinky.r;

var Users = thinky.createModel("User", {
  id: type.String(),
  login: {_type: type.String(), enforce_type: "strict"},
  password: {_type: type.String(), enforce_type: "strict"},
  email: {_type: type.String().email(), enforce_type: "strict"},
  age: type.number().default({
    if(this.birthDate){
      return this.birthDate.prototype.getFullYear() - r.now().prototype.getFullYear();
    }
    return null;
  }),
  birthDate: Date,
});

module.exports = Users;
