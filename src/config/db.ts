import { DataSource } from "typeorm"

    const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username:  process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entity/*.ts"],
    migrations: ['src/migration/*.ts'],
    logging: true,
    synchronize: true,
})



export default  myDataSource    