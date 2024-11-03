'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bell, 
  Moon, 
  Home,
  CircleDot, 
  Building2, 
  ChevronLeft,
  Search
} from "lucide-react"
import { CompanyStatus } from './CompanyStatus'
import { CreditScoreGauge } from './CreditScoreGauge'
import { FinancialInformation } from './FinancialInformation'
import { LoanSummary } from './LoanSummary'
import { CompanyInfo } from './CompanyInfo'
import { CompanyContext, CompanyDataType } from './company'
import { CreditHistory } from './CreditHIstory'
import NonBankData from './nonBankData'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Credit Score')
  const [direction, setDirection] = useState(0)
  
  const [companyData, setCompanyData] = useState<CompanyDataType>({
    founder: "Haris Azhari",
    yearFounded: "2020",
    phoneNumber: "+60123456789",
    email: "contact@evoteco.com",
    status: "Bumiputera",
    years: "5",
    industry: "Agriculture",
    numberOfEmployees: "50",
    companyDescription: "Focuses on sustainable agriculture and produces a variety of fresh vegetables",
    objective: "Aim to promote healthy eating"
  });

  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Building2, label: "Loan/Grant Recommendation" },
    { icon: CircleDot, label: "MPI" },
    { icon: CircleDot, label: "My Profile", className: "mt-auto" }
  ]

  const tabs = [
    "Credit Score",
    "Financial Information",
    "Company Status",
    "Other Non-Bank Data"
  ]

  const handleTabChange = (tab: string) => {
    const currentIndex = tabs.indexOf(activeTab)
    const newIndex = tabs.indexOf(tab)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveTab(tab)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const renderTabContent = () => {
    let content
    switch(activeTab) {
      case 'Credit Score':
        content = (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-6">Credit Score Meter</h3>
              <CreditScoreGauge score={800} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-6">Credit History</h3>
              <CreditHistory />
            </div>
          </div>
        )
        break
      case 'Financial Information':
        content = <FinancialInformation />
        break
      case 'Company Status':
        content = <CompanyStatus />
        break
      case 'Other Non-Bank Data':
        content = <NonBankData/>
        break
      default:
        content = null
    }

    return (
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeTab}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.2 }
          }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <CompanyContext.Provider value={{ data: companyData, setData: setCompanyData }}>
      <div className="min-h-screen bg-slate-50">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-48 bg-white border-r border-slate-200 p-4">
          <div className="mb-8">
            <img src="/placeholder.svg?height=32&width=100" alt="Scale.AI" className="w-24" />
          </div>
          <nav className="space-y-1">
            {navItems.map((item, i) => (
              <button
                key={i}
                className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left text-sm
                  ${item.active 
                    ? "bg-blue-900 text-white" 
                    : "text-slate-600 hover:bg-slate-50"}
                  ${item.className || ""}`
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-48">
          <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-sm">
                  <span>SME Information | #18934</span>
                  <span className="text-slate-400">Loan Product / Grant</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search"
                    className="pl-9 w-56 bg-slate-50"
                  />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Moon className="h-4 w-4" />
                </Button>
                <div className="w-8 h-8 bg-blue-900 rounded-full" />
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <CompanyInfo 
                  companyData={companyData}
                  setCompanyData={setCompanyData}
                />

                <Card>
                  <CardContent className="p-6 overflow-hidden">
                    <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => handleTabChange(tab)}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors flex-1 text-center
                            ${tab === activeTab 
                              ? "bg-blue-900 text-white" 
                              : "text-slate-600 hover:bg-white"}`
                          }
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {renderTabContent()}
                  </CardContent>
                </Card>
              </div>

              <div>
                <LoanSummary />
              </div>
            </div>
          </main>
        </div>
      </div>
    </CompanyContext.Provider>
  )
}
