const { Router } = require('express');
const db = require('../database');
// This function returns true or false
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// The token and the cookie are valid 3 days 
const maxAge = 3 * 24 * 60 * 60 * 1000;
const TOKEN_SECRET = "my-32-character-ultra-secure-and-ultra-long-secret";
router = Router();

// Play this function before creating a user to hash the password if exits
const hashPassword = async (req, res, next) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    } else {
        console.log(req.body);
        req.flash('error', "Veuillez saisir un mot de passe");
    }
}

// This route deletes a user from the database using the given id
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0) {
        try {
            user = (await db.promise().query(`SELECT * FROM USERS WHERE id = ${id}`))[0];
            if (user.length == 1) {
                await db.promise().query(`DELETE FROM USERS WHERE id = ${id}`);
                res.json({ 'msg': 'Successfully deleted user ' + user[0].username });
            }
        } catch (err) {
            res.json({ 'msg': 'User not found for ID ' + id });
        }
    } else {
        res.json({ 'msg': 'The ID is invalid.' });
    }
});

// This route deletes users with ID's greater than the given ID
router.delete('/delete-greater/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0) {
        try {
            db.promise().query(`DELETE FROM USERS WHERE id >= ${id}`);
            res.json({ 'msg': 'Successfully deleted' });
        } catch (err) {
            console.log(err);
            res.json({ 'msg': err.message });
        }
    } else {
        res.json({ 'msg': 'The ID is invalid.' });
    }
});

// This function updates a user's infos using the given id
router.put('/update/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const {  first_name, last_name } = req.body;
    if (id >= 0) {
        try {
            user = (await db.promise().query(`UPDATE USERS
            SET  first_name='${first_name}', last_name='${last_name}'
            WHERE id=${id}`));
            console.log(user);
            res.json(user);
            //req.flash('success', "Les donnees sont mises a jour");
            res.status(200).send("ok");
        } catch (err) {
            //req.flash('error', err.message);
            res.status(500).send(err.message);
        }
    }
});

// This route, when called, will return the list of the all the users in the database
router.get('/list', async (req, res) => {
    try {
        users = (await db.promise().query(`SELECT * FROM users;`))[0];
        console.log(users);
        res.json(users);
    } catch (err) {
        req.flash('error', err.message);
        //res.status(500).send(err.message);
    }
});

// Paginate the users' list
router.get('/list/:count/:page', async (req, res) => {
    const count = parseInt(req.params.count);
    const page = parseInt(req.params.page);
    if (count && page) {
        try {
            users = (await db.promise().query(`
                SELECT * FROM users LIMIT ${count * (page - 1)},${count};
            `))[0];
            res.json(users);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
});

// This route, when called, will create a user in the database according to the body of the post request.
router.post('/create', hashPassword, async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;
    if (username && isEmail(email) && password && first_name && last_name) {
        try {
            await db.promise().query(`
                INSERT INTO USERS (username, email, password, first_name, last_name)
                VALUES("${username}", "${email}", "${password}", "${first_name}", "${last_name}")`
            );
            res.status(201).send({ msg: 'User Created' });
        } catch (err) {
            console.log(err);
            //req.flash('error', err.message);
            res.status(500).send(err.message);
        }
    } else {
        //req.flash('error', "Veuillez saisir les champs manquants");
        res.status(200).send({ msg: 'Please enter non empty fields.' });
    }
});

// This route, when called, will bombard the users' table with random users
router.get('/create-random/:count', (req, res) => {
    const count = parseInt(req.params.count);
    if (count && 0 < count && count < 1000) {
        for (let i = 0; i < count; i++) {
            const f = randomString;
            db.promise().query(`
                INSERT INTO USERS VALUES(NULL, '${f()}', '${f() + "@" + f() + ".com"}', '${f()}', NULL, NULL)`
            );
        }
        res.status(201).send({ msg: `The database has been bombarded with ${count} users.` });
    } else {
        res.status(404).json({ msg: 'Bad number' })
    }

});
// This route, when called verify the user's infos and then generates a token 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        user = (await db.promise().query(`SELECT * FROM USERS WHERE email = '${email}'`))[0];
        if (user.length) {
            user = user[0];
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge });
                res.status(200).json({ user: user.id });
            }
           // req.flash('error', "Incorrect password . Please try again");
          else res.send("incorrect password");
        }
        //req.flash('error', "Incorrect email . Please try again");
        else res.send("incorrect email");
    } catch (err) {
       // req.flash('error', err.message);
       res.status(500).send(err.message);
    }
});
// This function deletes the user's cookie
router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

// This function returns a user's infos from the database using the given id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0) {
        try {
            user = (await db.promise().query(`SELECT * FROM USERS WHERE id = ${id}`))[0];
            console.log(user);
            res.json(user);
        } catch (err) {
            req.flash('error', err.message);
            //res.status(500).send(err.message);
        }
    }
});

// This function returns a random string used for testing.
function randomString() {
    return (Math.random() + 1).toString(36).substring(2);
};


// This function generates a token 
const createToken = (id) => {
    return jwt.sign({ id }, TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

// Exporting the router
module.exports = router;