import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    entities: ["src/entity/*.ts"],
    migrations: ['src/migration/*.ts'],
    logging: true,
    synchronize: true,
})



export default  myDataSource    