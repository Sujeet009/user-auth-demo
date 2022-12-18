import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import myDataSource from "../../db";
import { User } from "../entity/User";

const isAuthenticatedUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { token }: any = req.headers;
        if (!token) {
            return res.status(400).send({message:"token is required"});
        }
        const decodedData: any = verify(token, "sjkafnkjanfkjasfkasnfjn");
        const userTable = myDataSource.getRepository(User)

        req.user = await userTable.findOne({ where: { id: decodedData } });

        next();
    } catch (error) {
        return res.send(error)
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(400).send({message: `Role: ${req.user.role} is not allowed to access this resouce `});
      }
      next();
    };
  };

export  {isAuthenticatedUser, authorizeRoles};