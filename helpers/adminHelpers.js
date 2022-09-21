const { ObjectId } = require('mongodb')
const db = require('../config/connection')
const dayjs =require('dayjs')
const {v4}=require('uuid')

module.exports = {
    createNewEmp: (name) => {
        return new Promise(async (resolve, reject) => {
            db.get()?.collection('employe list').insertOne({
                name: name
            }).then((res) => {
                resolve(res)
            })
        })
    },
    createNewProject: (body) => {
        let d = v4()
        let date =new Date()
        date = date.toISOString().split('T')[0]

        return new Promise(async (resolve, reject) => {
            db.get()?.collection('daily-task').insertOne({
                date:date,
                taskName: body.name,
                estimated_time: body.time,
                started_At: "",
                ended_At: "",
                total_time: "",
                isCompleted:0
          })
        })
    },

    addUsersToTask: () => {
        let data = {
            
            name: '',
            id:'',
        }
        return new Promise(async (resolve, reject) => {
            let fun = await db.get()?.collection('project list').findOne({ _id: ObjectId('63298a64889c505c46ebb4a5') })
            if (fun) {
                db.get()?.collection('project list').updateOne({ _id: ObjectId('63298a64889c505c46ebb4a5') }, {
                    $push: { Users:data}
                })
            }

        }) 
    },
    addDailyTask: () => {
        let data = {
            
            taskName: "one",
            esitamitedTime: 3,
            startTime: "",
            endTime: "",
            isCompeleted:0
        }
        return new Promise(async (resolve, reject) => {
            let fun = await db.get()?.collection('project list').findOne({ _id: ObjectId('63298a64889c505c46ebb4a5') })
            if (fun) {
                db.get()?.collection('project list').updateOne({ _id: ObjectId('63298a64889c505c46ebb4a5') }, {
                    $push: { DailyTask:data}
                })
            }

        })
    },
}