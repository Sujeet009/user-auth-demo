import { Router } from "express";
import UserController from "./user.controller";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth";

const router = Router();

let  userController = new UserController()

router.get(
  "/get",
  [isAuthenticatedUser, authorizeRoles("user")],
  userController.getUser
);
router.get("/getAllUser", userController.getAllUser);
router.post("/register", userController.createUser);
router.delete(
  "/delete",
  [isAuthenticatedUser, authorizeRoles("user")],
  userController.deleteUser
);

export default router;
