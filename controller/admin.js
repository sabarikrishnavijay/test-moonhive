const adminHelpers=require('../helpers/adminHelpers')


const createEmpolye = async (req, res) => {
    let { empName } = req.body
    adminHelpers.createNewEmp(empName).then((res) => {
        console.log(res);
    })
    
}

const newProject = async (req, res) => {
    adminHelpers.createNewProject(req.body).then((res) => {
        console.log(res);
    })
}

const addDailyTask = async (req, res) => {
    adminHelpers.addDailyTask(req.body).then((res) => {
        console.log(res);
    })
}

module.exports = { createEmpolye, newProject, addDailyTask }