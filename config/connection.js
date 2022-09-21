const { MongoClient } = require('mongodb')


const state = {
    db: null

}

const url = "mongodb+srv://sabari:1212345456@cluster0.8v5wgre.mongodb.net/?retryWrites=true&w=majority"
const dbname = 'test'
const connectDb = async () => {
    try {
        const conn = await MongoClient.connect(url, function (err, data) {
            if (err) {
                console.log(err);
            }
            state.db = data.db(dbname)
            console.log("Database created!");

        })
    } catch (error) {
        console.error(error.message)
    }
}



module.exports = connectDb

module.exports.get = function () {
    return state.db
}