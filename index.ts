import "reflect-metadata";
import 'dotenv/config'
import * as express from "express";
import myDataSource from './src/config/db'
import routes from "./src/router";
import  * as cors from 'cors'
import errorMiddleware from './src/middleware/error';

const app = express()

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.use(express.json())

app.use("/api/v1", routes);
app.use(cors({origin: '*'}))
// Middleware for Errors
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})
