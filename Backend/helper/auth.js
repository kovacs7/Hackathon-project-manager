const bcrypt = require("bcrypt")

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 12, function (err, hash) {
          if (err) {
            reject(err)
          }
          resolve(hash)
        });
    })
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
    })
}

module.exports = {hashPassword, comparePassword}