import os
import json
import requests
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware

# 1. SETUP & CONFIGURATION
load_dotenv()
my_api_key = os.getenv("GROQ_API_KEY")
if not my_api_key:
    raise ValueError("GROQ_API_KEY is missing in your .env file!")

client = Groq(api_key=my_api_key)
MODEL_NAME = "qwen/qwen3.8-27b"  # Reliable Groq model
RESUME_PATH = Path(__file__).parent / "Karan_Deshmukh_Resume.pdf"

app = FastAPI(title="Karan's AI Portfolio Assistant")

# Allow your React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any frontend port during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 2. DATA MODELS (PYDANTIC SCHEMAS)
class ChatRequest(BaseModel):
    question: str

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []

class ResumeData(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    total_experience_years: float | None = None
    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[str] = []
    certifications: list[str] = []


# 3. HELPER FUNCTIONS (PDF & LIVE PROFILES)
def read_pdf(pdf_path: Path) -> str:
    """Extracts all text from a PDF file."""
    if not pdf_path.exists():
        raise FileNotFoundError(f"Resume not found at: {pdf_path}")
    reader = PdfReader(pdf_path)
    return "\n".join(page.extract_text() or "" for page in reader.pages)

def fetch_github_summary(username: str = "Karanndeshmukh") -> str:
    """Fetches public, non-forked GitHub repositories."""
    try:
        url = f"https://github.com{username}/repos?sort=updated&per_page=8"
        res = requests.get(url, timeout=5).json()
        if isinstance(res, list):
            repos = [
                f"- {r['name']}: {r['description'] or 'Public repository'} ({r['html_url']})"
                for r in res if not r.get("fork")
            ]
            return "Recent & Key GitHub Repositories:\n" + "\n".join(repos)
    except Exception:
        pass
    return ""

def fetch_leetcode_summary(username: str = "KaranDeshmukh") -> str:
    """Fetches live LeetCode problem-solving stats."""
    try:
        url = f"https://herokuapp.com{username}"
        res = requests.get(url, timeout=5).json()
        if res.get("status") == "success":
            return (
                f"LeetCode Stats: {res['totalSolved']} solved "
                f"(Easy: {res['easySolved']}, Medium: {res['mediumSolved']}, Hard: {res['hardSolved']})"
            )
    except Exception:
        pass
    return "LeetCode Profile: Active DSA solver (see DSA-Java repo on GitHub)."


# 4. CORE AI LOGIC
def parse_resume(resume_text: str) -> ResumeData:
    """Converts raw resume text into structured JSON using Groq."""
    schema = ResumeData.model_json_schema()
    system_prompt = f"""
    You are an expert resume parser. Extract details based on meaning, not just exact headings.
    Include internships inside experiences and extract skills across the entire resume.
    Return ONLY valid JSON matching this schema:
    {schema}
    Rules: Do not invent info. Use null for missing values and [] for empty lists.
    """
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Parse this resume:\n\n{resume_text}"}
        ],
        response_format={"type": "json_object"}
    )
    data = json.loads(response.choices[0].message.content)
    return ResumeData(**data)

def ask_candidate(question: str, structured_resume: ResumeData, github_info: str, leetcode_info: str) -> str:
    """Answers recruiter questions using the parsed resume and live profiles."""
    system_prompt = f"""You are Karan Deshmukh's personal AI portfolio assistant.
Chat naturally with recruiters and visitors in a polite, human-like tone using ONLY the data below.
Keep answers concise and conversational (3 to 5 short sentences or a clean bullet list), and avoid excessive bold formatting.
If a detail is missing, politely ask them to contact Karan at Karandeshmukh287@gmail.com.

--- ONLINE PROFILES ---
- LinkedIn: https://www.linkedin.com/in/karan-deshmukh-cse/
- GitHub: https://github.com/Karanndeshmukh
- LeetCode: https://leetcode.com/u/KaranDeshmukh/
- {leetcode_info}

Pinned Projects: Customer-Churn-Prediction, CyberQuest, DSA-Java, servicenow-family-expense-management
{github_info}

--- STRUCTURED RESUME DATA ---
{structured_resume.model_dump_json(indent=2)}
"""
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    )
    return response.choices[0].message.content


# ==========================================
# 5. LOAD DATA ON STARTUP & API ROUTES
# ==========================================
# Load and parse everything ONCE when the server starts so /chat is super fast!
raw_resume_text = read_pdf(RESUME_PATH)
PARSED_RESUME = parse_resume(raw_resume_text)
GITHUB_LIVE = fetch_github_summary("Karanndeshmukh")
LEETCODE_LIVE = fetch_leetcode_summary("KaranDeshmukh")

@app.get("/")
def home():
    return {
        "message": "Hello! I am Karan's Personal AI Portfolio Assistant.",
        "candidate": PARSED_RESUME.name,
        "status": "Ready to answer questions at POST /chat"
    }

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        answer = ask_candidate(
            question=request.question,
            structured_resume=PARSED_RESUME,
            github_info=GITHUB_LIVE,
            leetcode_info=LEETCODE_LIVE
        )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
