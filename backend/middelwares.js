const cookies = require('cookie-parser');
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
/*module.exports.checkUser = function (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                next();
            } else {
                try {
                    user = (await db.promise().query(`SELECT * FROM USERS WHERE id = ${decodedToken.id}`))[0];
                    console.log(user);
                    res.json(user);
                    res.user = user;
                } catch (err) {
                    req.flash('error', err.message);
                    //res.status(500).send(err.message);
                }
                next();
            }
        });
    } else {
        res.user = null;
        next();
    }
}*/