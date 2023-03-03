import { config } from "dotenv";

config();

const envs: Record<string, string> = {
  PORT_NUMBER: process.env.PORT_NUMBER || "",
  DOCKER_MONGO_URL: process.env.DOCKER_MONGO_URL || "",
  COLLECTION_NAME: process.env.COLLECTION_NAME || "",
  DB_NAME: process.env.DB_NAME || "",
};

export default envs;
