export const tableSchema = `
CREATE TABLE IF NOT EXISTS users (
  mail TEXT PRIMARY KEY NOT NULL,
  password TEXT NOT NULL,
  username TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);
`;
export const insertUserQ = 'INSERT INTO users VALUES(?, ?, ?, ?, ?)';
export const selectAllQ = `SELECT * FROM users;`;
export const selectByMailQ = `SELECT * FROM users WHERE mail = ?;`;
export const selectAuthQ = `SELECT * FROM users WHERE mail = ? AND password = ?;`;