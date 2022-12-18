import { NextFunction, Request, Response } from "express";
import myDataSource from '../../db'
import { createJwtToken } from "../utils/jwt";
import { User } from "../entity/User";

class UserController {
    static userTable = myDataSource.getRepository(User)
    static getUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user = await this.userTable.findOne({ where: { id: req.user.id } })
            return res.send(user)
        } catch (error) {
            return res.send(error.message)
        }
    }

    static createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            body.hashPassword()
            const user = await this.userTable.save(body)
            const token = createJwtToken(user.id)

            return res.send(token)
        } catch (error) {
            return res.send(error.message)
        }
    }

    static getAllUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user = await this.userTable.find()
            return res.send(user)
        } catch (error) {
            return res.send(error.message)
        }
    }

    static deleteUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user: any = await this.userTable.findOne({ where: { id: req.user.id } })
            const deleteUser = await this.userTable.delete({ id: user.id })

            return res.send({ message: "user Deleted succesfully" })
        } catch (error) {
            return res.send(error.message)
        }
    }
}

export default UserController;


