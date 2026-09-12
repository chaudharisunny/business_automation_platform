import * as companyRepository from "./company.repository";
import { ICreateCompany,IUpdateCompany } from "./company.interface";

export const createCompany = async (data: ICreateCompany) => {
    const company = await companyRepository.getCompanyByEmail(data.email);

    if(company){
        throw new Error("Company already exists");
    }

    return await companyRepository.createCompany(data);
};

export const getAllCompanies = async () => {
    return await companyRepository.getAllCompanies();
};

export const getCompanyById = async (id: number) => {
    const company = await companyRepository.getCompanyById(id);

    if(!company){
        throw new Error("comapny not found");
    }

    return company;
};

export const updateCompany = async (
    id: number,
    data: IUpdateCompany
) => {
    const company = await companyRepository.getCompanyById(id);

    if(!company) {
        throw new Error("Comapny not found");
    }

    return await companyRepository.updateCompany(id, data);
};

export const deleteCompany = async (id: number) => {
    const company = await companyRepository.getCompanyById(id);

    if(!company) {
        throw new Error("Company not found");
    }

    return await companyRepository.deleteCompany(id);
}