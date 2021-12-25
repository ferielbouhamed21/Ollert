const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const session = require('express-session')
const TOKEN_SECRET = "my-32-character-ultra-secure-and-ultra-long-secret";
module.exports = function (req, res, next) {
    if (req.session.flash) {
        res.flash = req.session.flash;
        req.session.flash = undefined;
    }
    req.flash = function (type, content) {
        if (req.session.flash == undefined) {
            req.session.flash = {}
        }
        req.session.flash[type] = content
    }
    next()
}
// This middelware ensures user security and login
module.exports.checkUser = function (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        // returns an error or a decodedToken
        jwt.verify(token, TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                return res.send('Not authenticated')
            } else {
                try {
                    user = (await db.promise().query(`SELECT * FROM USERS WHERE id = ${decodedToken.id}`))[0];
                    console.log(user[0]);
                    req.session.user = user[0];
                    res.locals.user = user[0];
                    return next();
                } catch (err) {
                    //req.flash('error', err.message);
                    res.status(500).send(err.message);
                }
            }
        });
    } else {
        res.locals.user = null;
        res.send('Not authenticated')
    }
}
//This middelware allows the user not to log in every time
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json('no token')
        } else {
          console.log(decodedToken.id);
          next();
        }
      });
    } else {
            res.send('No token');
    }
  };
//This middelware verifies if the user is a manager
module.exports.IsManager = async (req, res, next) => {
    if(req.session.user.role == 'CHEF')
        next();
    else
        res.json({msg: "No permissions"})
};