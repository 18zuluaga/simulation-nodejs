// import "reflect-metadata";
import express from "express";
import sequelize from "./config/db";
import router from "./routes/Router";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port 3000 ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
