
const { ObjectId } = require('mongodb')
const db = require('../config/connection')
module.exports = {
    getAllUsers: () => {
        try {
            return new Promise((async (resolve, reject) => {
                let data = await db.get()?.collection('employe list').find().toArray().then((response) => {
                    resolve(response)
                })


            }))

        }

        catch (error) {
            console.log(error);
        }

    },
    getAllTaks: () => {
        return new Promise(async (resolve, reject) => {
            db.get()?.collection('daily-task').find().sort({ _id: -1 }).toArray().then((response) => {
                resolve(response)
            })
        })
    },
    removeUser: (id) => {
        // console.log(id);
        // console.log('1111111111111111111111');
        return new Promise(async (resolve, reject) => {
            db.get()?.collection('employe list').deleteOne({ _id: ObjectId(id) }).then(() => {
                resolve()
            })
        })
    },

    taskStarted: (id) => {
        console.log((id));
        return new Promise(async (resolve, reject) => {
            db.get()?.collection('daily-task').updateOne({ _id: ObjectId(id) }, {
                $set: {
                    "started_At": new Date()
                }
            }).then(() => {
                resolve()
            })
        })
    },

    taskEnded: (id) => {
        console.log((id));
        return new Promise(async (resolve, reject) => {
            await db.get()?.collection('daily-task').updateOne({ _id: ObjectId(id) }, {
                $set: {
                    "ended_At": new Date()
                }
            })

            let time = await db.get()?.collection('daily-task').aggregate([
                {
                    $match: { _id: ObjectId(id) }
                },

                {
                    $project: {
                        timediff: {
                            $dateDiff:
                            {
                                startDate: "$started_At",
                                endDate: "$ended_At",
                                unit: "minute"
                            }
                        }
                    }
                }
            ]).toArray()

            let timeInHour = (parseInt(time[0].timediff) / 60).toFixed(2)

            await db.get()?.collection('daily-task').updateOne({ _id: ObjectId(id) }, {
                $set: {
                    "total_time": timeInHour,
                    "isCompleted": 1
                }
            }).then(() => {
                resolve() 
            })


        })

    },
    report2: ({ startDate, endDate }) => {
        return new Promise(async (resolve, reject) => {
            let time = await db.get()?.collection('daily-task').aggregate([
                {
                    $match: { "date": { $gte: startDate, $lte: endDate } }
                },
                {
                    $group: {
                        _id: null,
                        count: { $count: {} },

                    }
                }
            ]).toArray()

          resolve(time)

        })
    },
    report: ({startDate ,endDate}) => {
        return new Promise(async (resolve, reject) => {
            let time = await db.get()?.collection('daily-task').aggregate([
                {
                    $match: { "date": { $gte: startDate, $lte: endDate } }
                },
                {
                    $match: { "isCompleted": {$eq:1 } }
                },
                {
                    $group: {
                        _id: null,
                        count: { $count: {} },

                    }
                }
            ]).toArray()

          resolve(time)

        })
    },

}
