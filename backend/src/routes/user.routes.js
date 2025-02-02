import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  deleteUser,
} from "../controllers/user.controllers.js";
import { ProtectedRoutes } from "../middleware/auth.middleware.js";

const routers = Router();

routers.post("/signup", signup);
// routers.post("/verifyEmail", verifyEmail);
routers.post("/login", login);
routers.post("/logout", logout);

routers.get("/checkAuth", ProtectedRoutes, checkAuth);
routers.delete("/deleteUser/:email", ProtectedRoutes, deleteUser);


export default routers;
