import { Request, Response } from "express";
import * as companyService from "./company.service";

export const createCompany = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const company = await companyService.createCompany(req.body);

        res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company,
        })
    }catch(error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const companies = await companyService.getAllCompanies();

    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);

        const company = await companyService.getCompanyById(id);

        res.status(200).json({
            success: true,
            data: company, 
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCompany = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);

        const comapny = await companyService.updateCompany(id, req.body);

        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: comapny,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCompany = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);

        await companyService.deleteCompany(id);

        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        })
    }catch(error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};