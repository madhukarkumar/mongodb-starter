import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const updateAvatars = async () => {
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const collection = client.db('db_madhukar_19250').collection('users');
    
    const users = await collection.find({}).toArray();

    for (const user of users) {
      const randomSeed = Math.floor(Math.random() * 1000);
      const newImage = `https://i.pravatar.cc/300?u=${randomSeed}`;
      
      await collection.updateOne(
        { _id: user._id },
        { $set: { image: newImage } }
      );
    }

    console.log('All user avatars have been updated');
  } catch (error) {
    console.error('Error updating avatars:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

updateAvatars();