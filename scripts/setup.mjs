import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const setup = async () => {
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const hasData = await client
      .db('db_madhukar_19250')
      .collection('users')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(10)].map(() => {
      const fullName = faker.name.fullName();
      const [fName, ...lName] = fullName.split(' ');
      const username = faker.internet.userName(fName, lName.join(' '));
      const email = faker.internet.email(fName, lName.join(' '));
      const image = faker.image.avatar(); // Changed this to avatar for consistency

      return {
        name: fullName,
        username,
        email,
        image,
        followers: 0,
        emailVerified: null
      };
    });

    const insert = await client
      .db('db_madhukar_19250')
      .collection('users')
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};

try {
  setup();
} catch (error) {
  console.warn('Database is not ready yet. Skipping seeding...', error);
}

export { setup };