import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import myDataSource from "../config/db";
import { User } from "../entity/User.entity";
import ErrorHandler from "../utils/Errorhandle";

const isAuthenticatedUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { token }: any = req.headers;
        
        if (!token) {
          return next(new ErrorHandler("Please Login to access this resource", 401));
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