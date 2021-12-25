const { Router } = require('express');
const db = require('../database');
const { IsManager } = require('../middlewares');

router = Router();

// This route, when called, will return the list of the all tasks in the database
router.get('/list', async (req, res) => {
    try {
        tasks = (await db.promise().query(`SELECT * FROM tasks;`))[0];
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// Paginate the tasks' list
router.get('/list/:count/:page', async (req, res) => {
    const count = parseInt(req.params.count);
    const page = parseInt(req.params.page);
    if (count && page) {
        try {
            tasks = (await db.promise().query(`
                SELECT * FROM tasks LIMIT ${count * (page - 1)},${count};
            `))[0];
            res.json(tasks);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
});
// This route deletes a task from the database using the given id
router.delete('/:id', IsManager, async (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0) {
        task = (await db.promise().query(`SELECT * FROM tasks WHERE id = ${id}`))[0];
        if (task.length == 1) {
            db.promise().query(`DELETE FROM tasks WHERE id = ${id}`);
            res.json({ 'msg': 'Successfully deleted task ' });
        } else {
            res.json({ 'error': 'Task not found' });
        }
    } else {
        res.json({ 'error': 'The Id does not exists.' });
    }
});
// This route, when called, will create a project in the database according to the body of the post request.
router.post('/create', IsManager, async (req, res) => {
    const { state, name, description, deadline, id_project, id_user } = req.body;
    if (name && id_project && ['TODO', 'DOING', 'DONE'].includes(state)) {
        try {
            db.promise().query(`
            INSERT INTO tasks (state, name, description,deadline,id_project,id_user) VALUES
             ("${state}","${name}", "${description}", "${deadline}", "${id_project}", "${id_user}")`
            );
            res.status(201).send({ msg: 'Task Created' });
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    } else {
        res.status(401).send({ msg: 'Please enter non empty fields' });
    }
});
// This function updates a task's infos using the given id
router.put('/update/:id', IsManager, async (req, res) => {
    const id = parseInt(req.params.id);
    const { state , name, description, deadline, id_user } = req.body;
    if (id >= 0 && deadline != undefined) {
        try {
            task = (await db.promise().query(`UPDATE tasks
            SET  state = '${state}', name='${name}', description='${description}', deadline='${new Date(deadline).toISOString()} ', id_user='${id_user}'
            WHERE id=${id}`));
            console.log(task[0]);
            res.json(task[0]);
            //req.flash('success', "Les donnees sont mises a jour");
            res.status(200).send("ok");
        } catch (err) {
            //req.flash('error', err.message);
            res.status(500).send(err.message);
        }
    }
    return res.status(401).send('Check your fields');
});
// This route, when called, will return the list of  all the tasks  related to a specific project 
router.get('/list/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        tasks = (await db.promise().query(`SELECT *  FROM tasks where id_project = ${id} ;`))[0];
        console.log(tasks);
        res.json(tasks);
    } catch (err) {
        //req.flash('error', err.message);
        res.status(500).send(err.message);
    }
});
// This function returns a task's infos from the database using the given id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0) {
        try {
            task = (await db.promise().query(`SELECT * FROM tasks WHERE id = ${id}`))[0];
            if (task.length == 1) {
                console.log(task[0]);
                res.json(task[0]);
            }
            else res.json({ 'error': 'Task  not found' });
        } catch (err) {
            // req.flash('error', err.message);
            res.status(500).send(err.message);
        }
    }
});

//EXPORTING THE ROUTER
module.exports = router;