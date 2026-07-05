import { Router } from "express";

const router = Router();


import authRoutes from "../auth/auth.routes"
import userRoutes from "../users/user.routes"
import roleRouter from "../roles/role.routes"

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/role", roleRouter)

export default router;