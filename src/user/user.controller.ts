import { NextFunction, Request, Response } from "express";
import myDataSource from "../config/db";
import { createJwtToken } from "../utils/jwt";
import { User } from "../entity/User.entity";
import * as bcrypt from "bcryptjs";
import UserService from "../service/user.service";
const jwt_secret="sjkafnkjanfkjasfkasnfjn";

class UserController {
  userTable = myDataSource.getRepository(User);
  userService: UserService = new  UserService();

  async getUser (req: any, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      if(!user){
        throw new Error("user not found");
      }

      return res.send(user);

    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      body["password"] = bcrypt.hashSync(body.password, 8);

      const user = await this.userService.createUser(body);
      const token = createJwtToken(user.id);

      let response={
        message:"Record inserted Successfully....",
        data:user,
        token
      }
      return res.send(response);
      // return res.send({ token });
      
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  async getAllUser(req: any, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getAllUser();
      return res.send(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  async deleteUser(req: any, res: Response, next: NextFunction){
    try {
      const user = await this.userService.getUserById(req.user.id);
      await this.userService.deleteUser(user.id);

      return res.status(200).json({message:"delete user succesFully"});
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default UserController;
