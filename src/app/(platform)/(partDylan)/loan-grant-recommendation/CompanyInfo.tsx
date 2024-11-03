import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CompanyDataType } from "./company";

interface CompanyInfoProps {
  companyData: CompanyDataType;
  setCompanyData: (data: CompanyDataType) => void;
}

export function CompanyInfo({ companyData, setCompanyData }: CompanyInfoProps) {
  const handleChange = (field: string) => (e: { target: { value: any } }) => {
    setCompanyData({
      ...companyData,
      [field]: e.target.value,
    });
  };

  const companyDetails = [
    {
        icon: "🔱",
        label: "Founder",
        field: "Haris Azhari",
        value: companyData.founder,
        type: "tel",
    },
    {
        icon: "📅",
        label: "Year of Founded",
        field: "2019",
        value: companyData.yearFounded,
        type: "tel",
    },
    {
      icon: "👤",
      label: "Phone Number",
      field: "phoneNumber",
      value: companyData.phoneNumber,
      type: "tel",
    },
    {
      icon: "📧",
      label: "Contact Email",
      field: "email",
      value: companyData.email,
      type: "email",
    },
    {
      icon: "📄",
      label: "Status",
      field: "status",
      value: companyData.status,
      type: "text",
    },
    {
      icon: "📅",
      label: "Years",
      field: "years",
      value: companyData.years,
      type: "text",
    },
    {
      icon: "🏭",
      label: "Industry",
      field: "industry",
      value: companyData.industry,
      type: "text",
    },
    {
      icon: "👷",
      label: "Number of Employees",
      field: "numberOfEmployees",
      value: companyData.numberOfEmployees,
      type: "text",
    },
  ];

  return (
    <Card className="mb-6">
      <div className="relative">
        <div className="h-32 relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-[#DBE3E8] via-[#4F74AD] to-[#322D8D] opacity-40" />
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#4F46E5]/30 to-transparent" />
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#322D8D]/20 to-transparent" />
        </div>
        <div className="absolute top-20 left-6 transform translate-y-1/2 flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white">
            <span className="text-2xl">👤</span>
          </div>
        </div>
        <div className="pt-12 px-6 pb-6">
          <h2 className="text-xl font-medium">Evoteco Sdn Bhd</h2>
          <p className="text-sm text-slate-600">Company ID: #18934</p>
          <h3 className="text-lg font-medium mt-6 mb-4">Company Details</h3>
          <div className="grid grid-cols-2 gap-4">
            {companyDetails.map((item, i) => (
              <div key={i} className="space-y-2">
                <label className="text-sm text-slate-500">{item.label}</label>
                <div className="flex items-center gap-2 relative">
                  <span className="absolute left-3 text-lg z-10">{item.icon}</span>
                  <Input
                    className="pl-10"
                    value={item.value}
                    onChange={handleChange(item.field)}
                    type={item.type}
                    placeholder={`Enter ${item.label.toLowerCase()}`}
                  />
                </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}