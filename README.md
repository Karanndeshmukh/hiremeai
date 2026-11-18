#### HireMeAI — Karan's Personal AI Portfolio Assistant

An interactive, macOS-inspired personal AI portfolio website built with **React**, **FastAPI**, and **Groq LLM**. Visitors and recruiters can explore Karan Deshmukh's projects through a desktop dock interface or chat directly with an AI assistant trained on his resume, GitHub repositories, and LeetCode profile. 

#### Live Demo

🔗 **[View Live Portfolio](YOUR_DEPLOYED_LINK_HERE)** *(Replace with your live Vercel/Render link after deployment)* 

#### ✨ Key Features

* **macOS Desktop Experience:** Features a translucent menu bar with a live clock, desktop app shortcuts for LinkedIn, GitHub, and LeetCode, and a bottom project dock.
* **Interactive AI Portfolio Assistant:** Powered by Groq LLM (llama-3.3-70b-versatile) with structured resume parsing via Pydantic and PyPDF.
* **Live Profile Integration:** Automatically fetches recent public repositories from GitHub (@Karanndeshmukh) and problem-solving stats from LeetCode (@KaranDeshmukh).
* **Light & Dark Mode:** Seamless theme switcher in the top menu bar with frosted-glass (backdrop-filter: blur) styling.
* **Project Dock Shortcuts:** Quick-access folders in the dock that link directly to featured repositories like *Customer Churn Prediction*, *CyberQuest*, *DSA-Java*, and *ServiceNow Family Expense Management*.

#### 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS3 (Glassmorphism & Responsive Layout)
* **Backend:** Python, FastAPI, Uvicorn, Pydantic
* **AI & Data:** Groq API, PyPDF, Requests

#### 📂 Project Structure

text

hiremeai/
├── backend/
│   ├── main.py                     # FastAPI server, resume parser & Groq chat endpoint
│   └── Karan_Deshmukh_Resume.pdf   # Source resume parsed at startup
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # macOS desktop UI, dock, theme toggle & chat state
│   │   └── App.css                 # Light/dark wallpaper & frosted-glass styling
│   └── package.json
├── pyproject.toml
└── README.md

Use code with caution.

Copy code text to clipboard.

#### 🚀 Run Locally

#### 1. Clone the Repository

bash

git clone https://github.com/Karanndeshmukh/hiremeai.git
cd hiremeai

Use code with caution.

Copy code text to clipboard.

#### 2. Start the FastAPI Backend

bash

cd backend
pip install fastapi uvicorn groq pypdf pydantic python-dotenv requests

Use code with caution.

Copy code text to clipboard.

Create a .env file inside backend/ and add your Groq API key: 

env

GROQ_API_KEY=your_groq_api_key_here

Use code with caution.

Copy code text to clipboard.

Run the backend server: 

bash

uvicorn main:app --reload

Use code with caution.

Copy code text to clipboard.

The API will run at http://127.0.0.1:8000. 

#### 3. Start the React Frontend

Open a second terminal: 

bash

cd frontend
npm install
npm run dev

Use code with caution.

Copy code text to clipboard.

Open http://localhost:5173 in your browser. 

#### 📬 Connect With Me

* **LinkedIn:** [linkedin.com/in/karan-deshmukh-cse](https://www.linkedin.com/in/karan-deshmukh-cse/)
* **GitHub:** [github.com/Karanndeshmukh](https://github.com/Karanndeshmukh)
* **LeetCode:** [leetcode.com/u/KaranDeshmukh](https://leetcode.com/u/KaranDeshmukh/)
* **Email:** Karandeshmukh287@gmail.com
