import "reflect-metadata";
import 'dotenv/config'
import * as express from "express";
import myDataSource from './src/config/db'
import routes from "./src/router";

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app = express()
app.use(express.json())

app.use("/api/v1", routes);


app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})
