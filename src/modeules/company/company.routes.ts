import { Router } from "express";
import * as companyController from "./company.controller";
import { verifyToken } from "../../middleware/auth.middleware";


const router = Router();

// Create Company
router.post("/", verifyToken, companyController.createCompany);

// Get All Companies
router.get("/", verifyToken, companyController.getAllCompanies);

// Get Company By ID
router.get("/:id", verifyToken, companyController.getCompanyById);

// Update Company
router.put("/:id", verifyToken, companyController.updateCompany);

// Delete Company
router.delete("/:id", verifyToken, companyController.deleteCompany);

export default router;