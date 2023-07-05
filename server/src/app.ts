import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import sequelize from "./db/db";
import router from "./routes/main";

if (process.env.LOG !== "true")
    console.log = (...args: any[]) => {};

const app = express();

sequelize.authenticate()
    .then(() => console.log("Connection to db has been established successfully on port " + process.env.DB_PORT + "!"))
    .catch((err) => console.error("Unable to connect to the database:", err));

sequelize.sync({ force : true });

// Main route
app.use(router);
app.listen(process.env.PORT, () => console.log(`Server is now running on port ${process.env.PORT}!`));

export default app;
