import { NextFunction, Request, Response } from "express";
import myDataSource from "../../config/db";
import { createJwtToken } from "../../utils/jwt";
import { User } from "../../entity/User";
import * as bcrypt from "bcryptjs";
import UserService from "../service/user.service";

class UserController {
  static userTable = myDataSource.getRepository(User);
  static userService = UserService;

  static getUser = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.user.id);
      return res.send(user);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  };

  static createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;

      body["password"] = bcrypt.hashSync(body.password, 8);
      console.log("body1324534534534533", body);

      const user = await this.userService.createUser(body);
      const token = createJwtToken(user.id);

      return res.send({ token });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };

  static getAllUser = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getAllUser(req, res, next);
      return res.send(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };

  static deleteUser = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.user.id);
      const deleteUser = await this.userService.deleteUser(user.id);

      return res.send(deleteUser);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };
}

export default UserController;
