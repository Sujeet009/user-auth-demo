import { NextFunction, Request, Response } from "express";
import myDataSource from "../config/db";
import { createJwtToken } from "../utils/jwt";
import { User } from "../entity/User.entity";
import { Inject, Service } from "typedi";

@Service()
export class UserService {
  userTable = myDataSource.getRepository(User);

  async getAllUser(): Promise<User[]> {
    try {
      const user = await this.userTable.find();
      return user;
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.userTable.findOne({ where: { id: id } });
    } catch (error) {
      return error;
    }
  }

  async createUser(body: any): Promise<User> {
    try {
      const user = await this.userTable.save(body);
      return user;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.userTable.delete({ id });
    } catch (error) {
      return error;
    }
  }
}
