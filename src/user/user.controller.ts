import { NextFunction, Request, Response } from "express";
import myDataSource from "../config/db";
import { createJwtToken } from "../utils/jwt";
import { User } from "../entity/User.entity";
import * as bcrypt from "bcryptjs";
import {UserService} from "./user.service";
import ErrorHandler from "../utils/Errorhandle";

const userService = new UserService()

class UserController {
  userTable = myDataSource.getRepository(User);

  async getUser (req: any, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.user.id);
      if(!user){
        return next(new ErrorHandler("user not found",400));
      }

      return res.send(user);

    } catch (error) {
      next(error.message)
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      body["password"] = bcrypt.hashSync(body.password, 8);

      const user = await userService.createUser(body);
      
      const token = createJwtToken(user.id);

      return res.send({ token });
    } catch (error) {
      next(error)
    }
  }

  async getAllUser(req: any, res: Response, next: NextFunction) {
    try {
      const user = await userService.getAllUser();
      return res.send(user);
   
    } catch (error) {
      next(error)
      
    }

  }

  async deleteUser(req: any, res: Response, next: NextFunction){
    try {
      const user = await userService.getUserById(req.user.id);
      if(!user){
        return next(new ErrorHandler("user not found",400));
      }
      await userService.deleteUser(user.id);

      return res.status(200).json({message:"delete user succesFully"});
    } catch (error) {
      next(error)
    }
  }
}

export default UserController;
