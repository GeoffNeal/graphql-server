import Pool from "pg-pool";
import dotenv from "dotenv";

//load the .env file
dotenv.config();

const db = new Pool();

export default db;
