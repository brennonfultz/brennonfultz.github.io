const express = require('express'); //express app
const router = express.Router(); //router logic
const { expressjwt: jwt } = require('express-jwt');
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'payload'
});

//this is where we import the controllers we will route


router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) //GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); //POST method adds a trip

//GET method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;