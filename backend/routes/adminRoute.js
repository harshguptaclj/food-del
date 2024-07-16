import express from "express";
import { loginUser } from "../controllers/adminController.js";



const adminRouter = express.Router();

adminRouter.post("/login",loginUser);


export default adminRouter;