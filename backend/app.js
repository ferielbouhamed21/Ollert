/* LIBRARIES */
const express = require('express');
const session = require('express-session')
const cookies = require('cookie-parser');

//NOTE: Add external libraries here...

/* \LIBRARIES */

const db = require('./database');
const port = 5000;
const {checkUser , requireAuth} = require ('./middlewares');
/* REQUIRING ROUTES */
const usersRoute = require('./routes/users');
const projectsRoute = require('./routes/projects');
const tasksRoute = require('./routes/tasks');
const cookieParser = require('cookie-parser');
/* \REQUIRING ROUTES */

const app = express();
const mainRouter = express.Router();
/* MIDDLEWARES */ 

// Recognizes the incoming request object as a JSON Object
app.use(express.json());
// Recognizes the incoming request object as strings or arrays
app.use(express.urlencoded({ extended: false }));
//Let us read the cookieParser
app.use(cookieParser());

app.use(session({
    secret: 'aaaa',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
//NOTE: Add other middlewares here...
app.use(require('./middlewares'));
/* \MIDDLEWARES */ 
// jwt
app.use('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user.id)
  });

/* ROUTES */
app.use('/api', mainRouter);
mainRouter.use('/users', usersRoute);
mainRouter.use('/projects',projectsRoute);
mainRouter.use('/tasks',tasksRoute);
//NOTE: Add other routes here...

/* \ROUTES */


// Default route, used for testing if the application is reachable
// It should return OK to the client
mainRouter.get('/', (req, res) => {
    res.send(200);
})

// Starting the serving and listening on port
app.listen(port, () => 
    console.log("Server listening on port" + port )
);