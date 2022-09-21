var express = require('express');
const { getUsers, getAllTaks, deleteUser, startTask, endedTask, report } = require('../controller/users');

var router = express.Router();

/* GET home page. */
router.get('/users', getUsers)
router.get('/task',getAllTaks)
router.post('/deleteUser',deleteUser)
router.post('/startTask', startTask)
router.post('/endTask', endedTask)
router.post('/report', report)
module.exports = router;
