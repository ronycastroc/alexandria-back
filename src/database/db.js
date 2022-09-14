import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../configs/constants';

const mongoClient = new MongoClient(MONGO_URI);

async function mongo() {
    let db

    try {
        await mongoClient.connect();
        db.mongoClient.db('alexandria');
        console.log('MongoDB Conected')
        return db

    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export default mongo;