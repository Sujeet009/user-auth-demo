import { Router } from "express";
import user from "../user/user.route";

const routes = Router();

routes.use("/user", user);

export default routes;

