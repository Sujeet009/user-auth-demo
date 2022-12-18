import { NextFunction, Request, Response } from "express";
import myDataSource from '../../db'

import { User } from "../entity/User";

class UserController {
  static  userTable =  myDataSource.getRepository(User)
    static getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("======================");
            
            const user = this.userTable.find({
                select: ['id','name', 'role']
            })
           return res.send(user)
        } catch (error) {
            console.log("error====================>>", error);
            
           return res.send(error.message)
        }
    } 

    static createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
         const body = req.body

         const user = await this.userTable.save(body)
            
           return res.send(user)
        } catch (error) {
            console.log("error====================>>", error);
            
           return res.send(error.message)
        }
    } 
        
}

export default UserController;


