This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# To run python:
cd back-end/
Here's the step-by-step installation for all required packages for your FastAPI backend:

First, create and activate virtual environment:
Install all required packages:
pip install fastapi uvicorn pydantic pydantic-settings transformers torch pandas numpy slowapi

.\venv\Scripts\activate

uvicorn main:app --reload

# Run the front-end
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Dependencies:

ShadCN


## Important APIs

array of summarised_news into preproessed_news
http://localhost:8000/api/preprocess

array of summarised preprocess news into mpi score
http://localhost:8000/api/mpi/analyze-json


