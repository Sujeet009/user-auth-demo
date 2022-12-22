import { Router } from "express";
import UserController from "../controller/user.controller";
import { isAuthenticatedUser, authorizeRoles } from "../../middleware/auth";
import UserService from "../service/user.service";
import { useContainer } from "class-validator";

const router = Router();

router.get(
  "/get",
  [isAuthenticatedUser, authorizeRoles("user")],
  UserController.getUser
);
router.get("/getAllUser", UserController.getAllUser);
router.post("/register", UserController.createUser);
router.patch("/updateUser",UserController.updateuser);
router.delete(
  "/delete",
  [isAuthenticatedUser, authorizeRoles("user")],
  UserController.deleteUser
);
router.post("/login",UserController.loginUser);

export default router;
