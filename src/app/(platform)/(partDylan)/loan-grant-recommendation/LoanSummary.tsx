import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useCompanyData } from "./company";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define interfaces for the JSON structure
interface EligibilityCriteria {
  bumiputera_status: string;
  industry: string;
  years_of_business_operation: string;
}

interface FundingScheme {
  funding_name: string;
  description: string;
  website_link: string;
  funding_amount: string;
  coverage: string;
  tenure: string;
  interest_rate: string;
  eligibility_criteria: EligibilityCriteria;
}

export function LoanSummary() {
  const { data: companyData, setData: setCompanyData } = useCompanyData();
  
  const [formData, setFormData] = useState({
    loanAmount: "170,000",
    fundingType: "Loan",
    interestRate: "4.45",
    loanTerm: "6",
    stateOfCountry: "Selangor",
    type: "government"
  });
  
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const [fundingSchemes, setFundingSchemes] = useState<FundingScheme[]>([]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoanSelection = (loanName: string) => {
    setSelectedLoans(prev => {
      if (prev.includes(loanName)) {
        return prev.filter(name => name !== loanName);
      } else {
        return [...prev, loanName];
      }
    });
  };

  const handleSubmitSelections = () => {
    console.log('Selected loans:', selectedLoans);
    alert(`Submitted selections: ${selectedLoans.join(', ')}`);
  };

  const handleEvaluateClick = async () => {
    console.log('Evaluation Details:');
    console.log('Loan Details:', {
      loanAmount: formData.loanAmount,
      fundingType: formData.fundingType,
      interestRate: formData.interestRate,
      loanTerm: formData.loanTerm,
      stateOfCountry: formData.stateOfCountry,
      type: formData.type
    });
    console.log('Company Details:', {
      status: companyData.status,
      numberOfWorkers: companyData.numberOfEmployees,
      industry: companyData.industry,
      state: formData.stateOfCountry,
      companyDescription: companyData.companyDescription,
      objective: companyData.objective
    });

    try {
      const genAI = new GoogleGenerativeAI("");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `I am a ${companyData.status} ${companyData.industry} in ${formData.stateOfCountry} focuses on ${companyData.companyDescription}. 
I have ${companyData.numberOfEmployees} employees and ${companyData.objective}. Suggest me 3 suitable ${formData.type} grant schemes with ${formData.interestRate}% interest rate with a funding term of ${formData.loanTerm} for my startup with details such as funding 
name, description, website link, funding amount, coverage, tenure, interest rate and eligibility criteria such as bumiputera status, industry, 
years of business operation. show json format straight away no need to state any reminder or note to be precise, no need markdown format such as :
[{
  "funding_name": "Name of funding",
  "description": "Description of SME.",
  "website_link": "Website Link",
  "funding_amount": "Amount of funding in ringgit Malaysia",
  "coverage": "coverage of fund",
  "tenure": "Number of years",
  "interest_rate": "percentage interest rate",
  "eligibility_criteria": {
    "bumiputera_status": "Required or not required",
    "industry": "Type of industry",
    "years_of_business_operation": "Years of operation"
  }
}]`;
      
      console.log('Sending prompt to Gemini:', prompt);

      let result = await model.generateContent(prompt);
      let response = result.response.text();
      console.log('Raw Gemini Response:', response);

      try {
        const jsonMatch = response.match(/\[([\s\S]*?)\]/);
        if (jsonMatch) {
          const jsonString = `[${jsonMatch[1]}]`;
          const parsedResponse = JSON.parse(jsonString);
          console.log('Parsed Response:', parsedResponse);
          
          const schemes = Array.isArray(parsedResponse) ? parsedResponse : [parsedResponse];
          console.log('Final Schemes:', schemes);
          
          setFundingSchemes(schemes);
        } else {
          console.error("No JSON array found in response");
        }
      } catch (error) {
        console.error("Failed to parse JSON response:", error);
        console.error("Response that failed to parse:", response);
      }
    } catch (error) {
      console.error("Error generating content from Gemini AI:", error);
    }

    setShowRecommendations(true);
  };

  return (
    <div className="relative">
      <Card className="w-auto h-auto p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-medium">Grant Application</h3>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
              Processing
            </span>
          </div>
          <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-0">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Label htmlFor="loanAmount" className="text-sm opacity-90">Grant Amount</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-2xl font-bold">MYR</span>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className="pl-16 bg-transparent text-white border-white/20 focus:border-white text-2xl font-bold h-auto py-2"
                  />
                </div>
                <span className="text-xl">💰</span>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fundingType">Scope of Work</Label>
              <Input
                id="fundingType"
                name="fundingType"
                value={formData.fundingType}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                type="number"
                step="0.01"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Funding Term</Label>
              <Input
                id="loanTerm"
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleChange}
                type="number"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="stateOfCountry">State of Country</Label>
              <Input
                id="stateOfCountry"
                name="stateOfCountry"
                value={formData.stateOfCountry}
                onChange={handleChange}
                type="text"
                className="mt-1"
                placeholder="Enter state (e.g., Selangor, Penang)"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500"
              >
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <Button
            className="w-full bg-blue-900 hover:bg-blue-800 text-white mt-4"
            size="lg"
            onClick={handleEvaluateClick}
          >
            Evaluate by ScaleAI
          </Button>
        </div>
      </Card>

      {showRecommendations && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4">
            <h2 className="text-xl font-bold mb-2">Suggested Funding Schemes</h2>
            <p className="text-gray-600 mb-6">
              Based on your profile, here are the recommended funding schemes:
            </p>
            <p className="text-blue-600 italic mb-6">
              Mark the checkbox if you are likely to apply the funding scheme
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {fundingSchemes.map((scheme, index) => (
                <div key={index} className="border rounded-lg p-4 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-blue-600 font-semibold">{scheme.funding_name}</h3>
                    <Checkbox
                      checked={selectedLoans.includes(scheme.funding_name)}
                      onCheckedChange={() => handleLoanSelection(scheme.funding_name)}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 mb-2">
                      {scheme.description}
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-600 font-extrabold">Amount: </span>
                      <span className="font-extrabold">{scheme.funding_amount}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-600 font-extrabold">Term: </span>
                      <span className="font-extrabold">{scheme.tenure}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-600 font-extrabold">Interest Rate: </span>
                      <span className="font-extrabold">{scheme.interest_rate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-600 font-extrabold">Coverage: </span>
                      <span className="font-extrabold">{scheme.coverage}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm font-medium mb-1">Eligibility Criteria:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Bumiputera Status: {scheme.eligibility_criteria.bumiputera_status}</li>
                        <li>• Industry: {scheme.eligibility_criteria.industry}</li>
                        <li>• Years Required: {scheme.eligibility_criteria.years_of_business_operation}</li>
                      </ul>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(scheme.website_link, '_blank')}
                  >
                    Visit Website
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                className="bg-blue-900 hover:bg-blue-800 text-white"
                onClick={() => setShowRecommendations(false)}
              >
                Close
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSubmitSelections}
                disabled={selectedLoans.length === 0}
              >
                Submit Selected Options
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}