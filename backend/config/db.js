const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Mongo = 'mongodb://khlil:5AictnsU894NtQL@cluster0-shard-00-00.tymrq.mongodb.net:27017,cluster0-shard-00-01.tymrq.mongodb.net:27017,cluster0-shard-00-02.tymrq.mongodb.net:27017/SenteurDeCarthage?ssl=true&replicaSet=atlas-14jmhx-shard-0&authSource=admin&retryWrites=true&w=majority';
const connectDB = async () => {
    const connection = await mongoose.connect(Mongo,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

module.exports = connectDB