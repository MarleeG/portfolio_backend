import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', false);

  const { DB_USER, DB_PASSWORD } = process.env;
  const dbUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-fgs8h.mongodb.net/website-portfolio?retryWrites=true&w=majority`;
  const uri = process.env.MONGODB_URI || dbUri;

  try {
    await mongoose.connect(uri, {
      user: DB_USER,
      pass: DB_PASSWORD,
    });
    console.log('Database connected!');
  } catch (err: unknown) {
    console.error('DB CONNECT ERROR\n', err);
    throw err;
  }

  mongoose.connection.on('error', (err) => {
    console.error('MONGOOSE CONNECTION ERROR\n', err);
  });
}
