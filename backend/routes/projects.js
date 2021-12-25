const { Router } = require('express');
const db = require('../database');
const {IsManager} = require('../middlewares');
const session = require('express-session');
router = Router();

// This route, when called, will return the list of  all the projects in the database
router.get('/list', async (req, res) => {
    try {
        projects = (await db.promise().query(`SELECT *  FROM projects;`))[0];
        console.log(projects);
        res.json(projects);
    } catch (err) {
        //req.flash('error', err.message);
        res.status(500).send(err.message);
    }
});
// Paginate the projects' list
router.get('/list/:count/:page', async (req, res) => {
    const count  = parseInt(req.params.count);
    const page = parseInt(req.params.page);
    if(count && page){
        try {
            projects = (await db.promise().query(`
                SELECT * FROM projects LIMIT ${count * (page - 1)},${count};
            `))[0];
            res.json(projects);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
});
// This route deletes a project from the database using the given id
router.delete('/:id', IsManager, async (req, res) => {
    const id  = parseInt(req.params.id);
    if(id >= 0){
        project = (await db.promise().query(`SELECT * FROM projects WHERE id = ${id}`))[0];
        if(project.length == 1){
            db.promise().query(`DELETE FROM projects WHERE id = ${id}`);
            res.json({'msg': 'Successfully deleted project '});
        }else{
            res.json({'error': 'Project not found' });
        }
    }else{
        res.json({'error': 'The Id does not exists.'});
    }
});
// This route, when called, will create a project in the database according to the body of the post request.
router.post('/create', IsManager,async (req, res) => {
    const { name,type,description,deadline } = req.body;
    if (name && type ) {
        let id_project_manager = req.session.user.id;
        try {
            db.promise().query(`
            INSERT INTO projects (name, type, description,deadline,id_project_manager) VALUES
             ("${name}", "${type}", "${description}", "${new Date(deadline).toISOString()}", "${id_project_manager}")`
            );
            res.status(201).send({ msg: 'Project Created' });
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    } else {
        res.status(401).send({ msg: 'Please enter non empty fields' });
    }
});
// This function updates a project's infos using the given id
router.put('/update/:id',IsManager, async (req, res) => {
    const id = parseInt(req.params.id);
    const { name,type, description, deadline  } = req.body;
    if (id >= 0 && name != undefined && type  != undefined && description  != undefined && deadline != undefined) {
        try {
            project = (await db.promise().query(`UPDATE projects
            SET  name='${name}', type='${type}', description='${description}', deadline='${new Date(deadline).toISOString()}'
            WHERE id=${id}`));
            console.log(project[0]);
            res.json(project[0]);
            //req.flash('success', "Les donnees sont mises a jour");
            res.status(200).send("ok");
        } catch (err) {
            //req.flash('error', err.message);
            res.status(500).send(err.message);
        }
    }
    return res.status(401).send('Check your fields')
});
// This route will return only members 
router.get('/users/:id', async (req,res) => {
    const id = parseInt(req.params.id) ;
    try {
        users = (await db.promise().query(`SELECT * FROM users  where 
            users.id IN (select id_user from project_user where id_project = ${id} );`))[0];
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
} );
// This route will return the manager of a specific project 
router.get('/manager/:id', async (req,res) => {
    const id = parseInt(req.params.id) ;
    try {
        manager = (await db.promise().query(`SELECT * FROM users  where 
            users.id IN (select id_project_manager from projects  where id = ${id});`))[0];
        res.json(manager);
    } catch (err) {
        res.status(500).send(err.message);
    }
} );

// This function returns a project's infos from the database using the given id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0) {
        try {
            project = (await db.promise().query(`SELECT * FROM projects WHERE id = ${id}`))[0];
            if (project.length == 1){
                console.log(project[0]);
                return res.json(project[0]);
            }
            else return res.json({'error': 'Project  not found'});
        } catch (err) {
           // req.flash('error', err.message);
            return res.status(500).send(err.message);
        }
    }
    return res.status(400).send("Please enter a number");
});

//EXPORTING THE ROUTER
module.exports = router;

