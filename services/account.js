const Account = require("../models/Account");

function getAccount(key, value) {
  if (key == "_id") {
    return Account.findById(value);
  } else if (key == "o") {
    return Account.find(value);
  } else {
    return Account.find(key && value && { [key]: value });
  }
}

function createAccount({}){
    const acc=new Account({
        
    })
}

module.exports = { getAccount };
