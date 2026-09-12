"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.getCompanyById = exports.getAllCompanies = exports.createCompany = void 0;
const companyRepository = __importStar(require("./company.repository"));
const createCompany = async (data) => {
    const company = await companyRepository.getCompanyByEmail(data.email);
    if (company) {
        throw new Error("Company already exists");
    }
    return await companyRepository.createCompany(data);
};
exports.createCompany = createCompany;
const getAllCompanies = async () => {
    return await companyRepository.getAllCompanies();
};
exports.getAllCompanies = getAllCompanies;
const getCompanyById = async (id) => {
    const company = await companyRepository.getCompanyById(id);
    if (!company) {
        throw new Error("comapny not found");
    }
    return company;
};
exports.getCompanyById = getCompanyById;
const updateCompany = async (id, data) => {
    const company = await companyRepository.getCompanyById(id);
    if (!company) {
        throw new Error("Comapny not found");
    }
    return await companyRepository.updateCompany(id, data);
};
exports.updateCompany = updateCompany;
const deleteCompany = async (id) => {
    const company = await companyRepository.getCompanyById(id);
    if (!company) {
        throw new Error("Company not found");
    }
    return await companyRepository.deleteCompany(id);
};
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=company.service.js.map