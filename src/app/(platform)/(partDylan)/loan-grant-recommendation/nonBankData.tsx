import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState, useContext } from "react"
import { CompanyContext } from "./company"

export function NonBankData() {
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
          <label className="text-sm text-slate-500">Target Market</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">🎯</span>
            <div>
              <p className="font-medium">Farmers</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Projected Market Share</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📈</span>
            <div>
              <p className="font-medium">20%</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">SSM Company Registration</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📝</span>
            <div>
              <p className="font-medium">Registered</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Awards and Recognition</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">🏆</span>
            <div>
              <p className="font-medium">Agriculture Seed Startup Award 2021</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-500">Project Timeline Proposal</label>
        <div className="flex items-center gap-2 relative p-3 border rounded-lg">
          <span className="text-lg">📄</span>
          <div>
            <a 
              href="src/app/(platform)/(partDylan)/loan-grant-recommendation/ProjectTimelineProposal.pdf"  // Make sure the path matches your file location
              className="text-blue-600 hover:underline cursor-pointer" 
              download
            >
              Download File
            </a>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-500">Regulatory and Supporting Documents</label>
        <div className="flex items-center gap-2 relative p-3 border rounded-lg">
          <span className="text-lg">📄</span>
          <div className="flex items-center gap-2">
            <a 
              href="src/app/(platform)/(partDylan)/loan-grant-recommendation/Regulatory and Supporting Documents .pdf"  // Change to the correct file name if different
              className="text-blue-600 hover:underline cursor-pointer" 
              download
            >
              Download file
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NonBankData;