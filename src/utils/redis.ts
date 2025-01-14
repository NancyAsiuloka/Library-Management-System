// @ts-ignore
import { createClient } from "redis";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();

export const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

export const setexAsync = promisify(client.setEx).bind(client);
export const getAsync = promisify(client.get).bind(client);
export const delAsync = promisify(client.del).bind(client);

client.on("connect", () => {
  console.log("Redis connected successfully");
});

client.on("error", (error: Error) => {
  console.log("Error in Redis connection", error);
});

process.on("SIGINT", () => {
  client.quit();
});
