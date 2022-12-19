import { Router } from "express";
import UserController from "../controller/user.controller";
import { isAuthenticatedUser, authorizeRoles } from "../../middleware/auth";

const router = Router();

router.get(
  "/get",
  [isAuthenticatedUser, authorizeRoles("user")],
  UserController.getUser
);
router.get("/getAllUser", UserController.getAllUser);
router.post("/register", UserController.createUser);
router.delete(
  "/delete",
  [isAuthenticatedUser, authorizeRoles("user")],
  UserController.deleteUser
);

export default router;
