import { Card, CardContent } from "@/components/ui/card";

export function FinancialInformation() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Annual Sales</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">💰</span>
            <div>
              <p className="font-medium">MYR 64,321</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Debt Service Ratio</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📊</span>
            <div>
              <p className="font-medium">19%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-500">YoY Growth Rate</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">💰</span>
            <div>
              <p className="font-medium">MYR 64,321</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">P&L Margin</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📊</span>
            <div>
              <p className="font-medium">19%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Cashflow</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">💰</span>
            <div>
              <p className="font-medium">MYR 64,321</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Sales Forecast</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📊</span>
            <div>
              <p className="font-medium">19%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Annual Report</label>
          <div className="flex items-center gap-2 relative p-3 border rounded-lg">
            <span className="text-lg">📄</span>
            <div className="flex items-center gap-2">
              <a
                href="src/app/(platform)/(partDylan)/loan-grant-recommendation/Regulatory and Supporting Documents .pdf" // Change to the correct file name if different
                className="text-blue-600 hover:underline cursor-pointer"
                download
              >
                Download file
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
