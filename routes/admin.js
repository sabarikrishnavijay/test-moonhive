const express = require('express');
const router = express.Router();
const {createEmpolye, newProject, addDailyTask}=require('../controller/admin');


/* GET users listing. */

router.post('/', createEmpolye)
router.post('/new-project', newProject)
router.get('/add-daily-task', addDailyTask)

module.exports = router;
 