import { createContext, useContext } from "react";

export interface CompanyDataType {
  founder: string;
  yearFounded: string;
  phoneNumber: string;
  email: string;
  status: string;
  years: string;
  industry: string;
  numberOfEmployees: string;
  companyDescription: string;
  objective: string;
}

// Simplified CompanyContextType to only include data and setter
interface CompanyContextType {
  data: CompanyDataType;
  setData: React.Dispatch<React.SetStateAction<CompanyDataType>>;
}

export const CompanyContext = createContext<CompanyContextType | null>(null);

export const useCompanyData = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyData must be used within a CompanyProvider");
  }
  return context;
};
