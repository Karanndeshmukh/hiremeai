# HireMeAI — Karan's Personal AI Portfolio Assistant

An interactive, macOS-inspired personal AI portfolio website built using **React, FastAPI, and Groq LLM**.

HireMeAI allows visitors and recruiters to explore Karan Deshmukh's technical background, projects, skills, and achievements through an interactive desktop interface or by chatting directly with an AI-powered portfolio assistant.

The assistant provides context-aware responses grounded in Karan's resume, GitHub repositories, and LeetCode profile.

## 🌐 Live Demo

- **Live Portfolio:** https://hiremeai-three.vercel.app/
- **Backend API:** https://hiremeai-o82y.onrender.com
- **GitHub Repository:** https://github.com/Karanndeshmukh/hiremeai

## Snapshot
<img width="1912" height="957" alt="image" src="https://github.com/user-attachments/assets/0b24fcfe-ad15-4a39-a1b4-7c0247d003d4" />


## ✨ Key Features

### 🖥️ macOS-Inspired Desktop Interface
- Minimal macOS-style desktop environment.
- Translucent menu bar with a live clock.
- Interactive desktop shortcuts for LinkedIn, GitHub, and LeetCode.
- Bottom dock with quick-access project shortcuts.
- Responsive layout with modern glassmorphism styling.

### 🤖 AI-Powered Portfolio Assistant
- Powered by Groq API using **Llama 3.3 70B Versatile**.
- Interactive chat interface for recruiters and visitors.
- Resume parsing using PyPDF.
- Structured data validation using Pydantic.
- Provides answers based on Karan's professional background and project information.

### 🔗 Live Profile Integration
- Fetches recent public repositories from GitHub.
- Retrieves problem-solving statistics from LeetCode.
- Provides quick access to professional profiles.

### 🎨 Theme Customization
- Light and dark mode support.
- Frosted-glass UI using CSS backdrop filters.
- Smooth and consistent visual experience.

### 📁 Project Explorer
Quick access to featured projects, including:
- Customer Churn Prediction
- CyberQuest
- DSA-Java
- ServiceNow Family Expense Management

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS3 |
| Backend | Python, FastAPI, Uvicorn |
| AI / LLM | Groq API, Llama 3.3 70B Versatile |
| Data Processing | PyPDF, Pydantic, Requests |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

## 📂 Project Structure

```text
hiremeai/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── Karan_Deshmukh_Resume.pdf
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── pyproject.toml
└── README.md
```

## 🚀 Getting Started

Follow these steps to run HireMeAI locally.

### Prerequisites

Make sure you have the following installed:

- Python 3.10+
- Node.js and npm
- Git
- Groq API Key

### 1. Clone the Repository

```bash
git clone https://github.com/Karanndeshmukh/hiremeai.git
cd hiremeai
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Replace `your_groq_api_key_here` with your actual API key.

**Important:** Never commit your `.env` file or expose your API key publicly.

### 4. Run the Backend Server

```bash
uvicorn main:app --reload
```

The FastAPI backend will be available at:

http://127.0.0.1:8000

### 5. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the following URL in your browser:

http://localhost:5173

## ⚙️ Deployment

HireMeAI is deployed using:

- **Frontend:** Vercel
- **Backend:** Render

The frontend communicates with the deployed FastAPI backend, which handles resume processing and AI-powered chat requests.

## 👨‍💻 About Me

**Karan Deshmukh**

B.Tech Computer Science and Engineering student passionate about software development, data analytics, artificial intelligence, and building practical technology solutions.

I enjoy exploring new technologies and developing projects that combine software engineering with real-world problem-solving.

## 📬 Connect With Me

- **Portfolio:** https://hiremeai-three.vercel.app/
- **LinkedIn:** https://www.linkedin.com/in/karan-deshmukh-cse/
- **GitHub:** https://github.com/Karanndeshmukh
- **LeetCode:** https://leetcode.com/u/KaranDeshmukh/
- **Email:** Karandeshmukh287@gmail.com

---

⭐ If you find this project interesting, consider giving the repository a star!!

**Built with ❤️ by Karan Deshmukh**
