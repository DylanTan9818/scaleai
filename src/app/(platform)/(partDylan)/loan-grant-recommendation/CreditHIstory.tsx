import { Card, CardContent } from "@/components/ui/card"

export function CreditHistory() {
    const creditFactors = [
      { label: "Payment History", value: 80, percent: "45%" },
      { label: "Amount Owed", value: 60, percent: "30%" },
      { label: "Credit History Length", value: 50, percent: "15%" },
      { label: "Credit Mix & New Credit", value: 70, percent: "25%" }
    ]

    return (
      <Card className="p-6">
        <CardContent className="p-0">
          <div className="space-y-4">
            {creditFactors.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-600">
                    {item.label} ({item.percent})
                  </span>
                </div>
                <div className="w-full bg-slate-50 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: '#0053B3'
                    }}
                  />
                </div>
              </div>
            ))}
            <button className="flex items-center gap-2 text-sm text-blue-900 mt-6">
              <span className="font-medium">CTOS Report</span>
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }