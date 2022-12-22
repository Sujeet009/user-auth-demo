import { NextFunction, Request, Response } from "express";
import myDataSource from "../config/db";
import { createJwtToken } from "../utils/jwt";
import { User } from "../entity/User.entity";

class UserService  {
   userTable = myDataSource.getRepository(User);

    async getAllUser (): Promise<User[]> {
    try {
      const user = await this.userTable.find();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  async getUserById (id: number): Promise<User>  {
    try {
      return await this.userTable.findOne({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message); 
    }
  };

   async createUser (body: any): Promise<User> {
    try {
      const user = await this.userTable.save(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

     async deleteUser (id: number)  {
    try {
      await this.userTable.delete({ id });

      return { message: "user Deleted succesfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default UserService;
