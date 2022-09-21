
const userHelpers = require('../helpers/userHelpers')


const getUsers = async (req, res) => {
    await userHelpers.getAllUsers().then((response) => {
       // console.log(response);
        res.json(response)
    })
}

const getAllTaks = async (req, res) => {
    await userHelpers.getAllTaks().then((response) => {
        //console.log(response);
        res.json(response)
    })
}

const deleteUser = async (req, res) => {
    await userHelpers.removeUser(req.body.id).then(() => {
        res.json({ message: "done" })
    })
}

const startTask = async (req, res) => {

    await userHelpers.taskStarted(req.body.id).then(() => {
        res.json({ message: "task Started" })
    })

}

const endedTask = async (req, res) => {
    await userHelpers.taskEnded(req.body.id).then(() => {
        res.json({ messsage: 'Taskend' })
    })
}

const report = async (req, res) => {

   
    let totalTasks = await userHelpers.report2(req.body)
    let CompletedTasks = await userHelpers.report(req.body)
 
    let total=totalTasks[0].count
    let completed = CompletedTasks[0].count
    let pending= total-completed

   res.json({total,completed,pending})
} 

module.exports = { getUsers, getAllTaks, deleteUser, startTask, endedTask, report } 