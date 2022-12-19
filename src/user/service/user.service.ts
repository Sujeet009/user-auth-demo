import { NextFunction, Request, Response } from "express";
import myDataSource from "../../config/db";
import { createJwtToken } from "../../utils/jwt";
import { User } from "../../entity/User";

class UserService {
  static userTable = myDataSource.getRepository(User);

  static getAllUser = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = await this.userTable.find();
      return user;
    } catch (error) {
      return error;
    }
  };

  static getUserById = async (id: number) => {
    try {
      const user = await this.userTable.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static createUser = async (body: any) => {
    try {
      const user = await this.userTable.save(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteUser = async (id: number) => {
    try {
      await this.userTable.delete({ id });

      return { message: "user Deleted succesfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default UserService;
