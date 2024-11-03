<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">AI Business Advisor</h3>

  <p align="center">
    An intelligent platform helping Malaysian SMEs navigate grants and market landscapes
    <br />
    <a href="#documentation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="issues">Report Bug</a>
    ·
    <a href="issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

AI Business Advisor is an intelligent platform designed to help Malaysian SMEs navigate the complex landscape of government grants and market trends. By leveraging advanced AI technologies, our platform provides personalized grant recommendations and comprehensive market insights through an intuitive dashboard interface.

### Key Features

* **Grant Recommendation(Prescriptive)**: Gemini-powered system that matches SMEs with relevant government grants based on their business profile
* **Market Landscape Dashboard(Descriptive)**: Interactive visualization of current and historical GDP trends by sector to gain a better overview of the Malaysia market
* **Market Performance (Predictive)**: Utilizes multiple AI models which is OpenAI for comprehensive business analysis


### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
* ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* Python (v3.8 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your_username/ai-business-advisor.git
   ```

2. Install NPM packages for the frontend
   ```sh
   cd frontend
   npm install
   ```

3. Set up Python virtual environment and install dependencies
   ```sh
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Create a .env file in both frontend and backend directories with your API keys
   ```sh
   # Frontend .env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   
   # Backend .env
   OPENAI_API_KEY=your_openai_key
   GEMINI_API_KEY=your_gemini_key
   YOUTUBE_API_KEY=your_youtube_key
   ```

<!-- USAGE -->
## Usage

1. Start the FastAPI backend:
   ```sh
   cd backend
   uvicorn main:app --reload
   ```

2. Start the Next.js frontend:
   ```sh
   cd frontend
   npm run dev
   ```

3. Open http://localhost:3000 in your browser


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact Project Contributers

Haziq Hakimi Mazlisham (Lead) - [@qimichanga](https://twitter.com/qimichanga) - haziqhakimi02@gmail.com
Tan Zhe Han Dylan -  zhtan@live.com
Haris Azhari bin Zaharudin -  haris.azhari535@gmail.com

Project Link: [https://github.com/haziqishere/scaleai](https://github.com/haziqishere/scaleai)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/