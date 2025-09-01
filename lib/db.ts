import db from './db-utils';

// For backward compatibility
async function dbConnect() {
  await db.connect();
  return { connection: { readyState: 1 } }; // Mimic Mongoose connection object
}

export { db, dbConnect };
