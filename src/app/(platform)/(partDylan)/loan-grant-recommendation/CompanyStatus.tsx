import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState, useContext } from "react"
import { CompanyContext } from "./company"

export function CompanyStatus() {
  const context = useContext(CompanyContext);
  if (!context) return null;

  const { data: companyData, setData: setCompanyData } = context;

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...companyData,
      companyDescription: e.target.value
    });
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...companyData,
      objective: e.target.value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Number of Employees</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">👥</span>
            <div>
              <p className="font-medium">10</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Address</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📍</span>
            <div>
              <p className="font-medium">6, Jalan Gottlieb, 10240, Penang</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-500">Registration Date</label>
        <div className="flex items-center gap-2 relative p-3 border rounded-lg">
          <span className="text-lg">📅</span>
          <div>
            <p className="font-medium">19 June 2017</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-500">Company Profile</label>
        <div className="flex items-center gap-2 relative p-3 border rounded-lg">
          <span className="text-lg">📄</span>
          <div className="flex items-center gap-2">
            <p className="text-blue-600 hover:underline cursor-pointer">Download here</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-500">Company Description</label>
        <Input
          type="text"
          placeholder="Enter a brief description of the company..."
          className="w-full p-3 border rounded-lg outline-none focus:border-blue-500"
          value={companyData.companyDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-500">Objective</label>
        <Input
          type="text"
          placeholder="Enter company objective..."
          className="w-full p-3 border rounded-lg outline-none focus:border-blue-500"
          value={companyData.objective}
          onChange={handleObjectiveChange}
        />
      </div>
    </div>
  )
}

export default CompanyStatus;