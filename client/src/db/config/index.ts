import { Db, MongoClient } from "mongodb";

if (!process.env.MONGODB_CONNECTION_STRING) {
  throw new Error(
    "MONGODB_CONNECTION_STRING is not defined in the environment variables"
  );
}

const uri: string = process.env.MONGODB_CONNECTION_STRING;

const client: MongoClient = new MongoClient(uri);

const db: Db = client.db(process.env.MONGODB_DB_NAME);

export { client, db };
