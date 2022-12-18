import "reflect-metadata";
import * as express from "express";
import myDataSource from './db'
import routes from "./src/router";
import user from "./src/router/user"

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app = express()
app.use(express.json())

app.use("/api/v1", user);


app.listen('6000', () => {
    console.log("server is running");
})
