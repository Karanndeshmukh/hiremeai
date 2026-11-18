import { useEffect, useRef, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const projects = [
  {
    name: "Customer Churn",
    fullName: "Customer Churn Prediction",
    repoUrl: "https://github.com/Karanndeshmukh/Customer-Churn-Prediction",
  },
  {
    name: "CyberQuest",
    fullName: "CyberQuest",
    repoUrl: "https://github.com/Karanndeshmukh/Karanndeshmukh/CyberQuest",
  },
  {
    name: "DSA-Java",
    fullName: "DSA-Java",
    repoUrl: "https://github.com/Karanndeshmukh/DSA-Java",
  },
  {
    name: "ServiceNow Expenses",
    fullName: "ServiceNow Expense App",
    repoUrl:
      "https://github.com/Karanndeshmukh/servicenow-family-expense-management",
  },
  {
    name: "Document Intake",
    fullName: "Document Intake Assistant",
    repoUrl: "https://github.com/Karanndeshmukh/document-intake-assistant",
  },
  {
    name: "All Repositories",
    fullName: "All Repositories",
    repoUrl: "https://github.com?tab=repositories",
  },
];

const profileLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/karan-deshmukh-cse",
    initials: "in",
  },
  {
    name: "GitHub",
    href: "https://github.com/Karanndeshmukh?tab=repositories",
    initials: "GH",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/KaranDeshmukh/",
    initials: "LC",
  },
];

const menuDetails = {
  Projects: "Open a project folder in the Dock to visit its GitHub repository.",
  Skills: "Ask the AI assistant about Karan's skills and technical experience.",
  Contact: "Ask the AI assistant how to get in touch with Karan.",
  Resume: "Ask the AI assistant about Karan's resume and experience.",
};

function Icon({ name }) {
  const iconPaths = {
    apple: (
      <path d="M17.3 12.5c0-2 1.6-3 1.7-3.1a4 4 0 0 0-3.2-1.7c-1.4-.2-2.7.8-3.4.8-.7 0-1.8-.8-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.8.7 3 .7c1.2 0 2-1.1 2.7-2.2.9-1.3 1.2-2.6 1.2-2.7-.1 0-2-.8-2-3.7ZM15 6.2A4 4 0 0 0 16 3a4.2 4.2 0 0 0-2.8 1.5A3.8 3.8 0 0 0 12.3 7a3.5 3.5 0 0 0 2.7-.8Z" />
    ),
    wifi: (
      <>
        <path d="M2.5 8.8a17.5 17.5 0 0 1 19 0" />
        <path d="M5.8 12.2a11.5 11.5 0 0 1 12.4 0" />
        <path d="M9.1 15.6a5.5 5.5 0 0 1 5.8 0" />
        <circle cx="12" cy="19" r="1" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m15.5 15.5 4.3 4.3" />
      </>
    ),
    controls: (
      <>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="13" width="18" height="7" rx="2" />
        <circle cx="8" cy="7.5" r="1.5" />
        <circle cx="16" cy="16.5" r="1.5" />
      </>
    ),
    moon: <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.8 8.8 0 1 0 20.2 15.1Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
  };

  return (
    <svg
      className={`icon icon-${name}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}

function formatInlineMarkdown(text) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderAssistantMessage(text) {
  const content = [];
  let bulletItems = [];

  const addBulletList = () => {
    if (bulletItems.length === 0) return;

    content.push(
      <ul key={`list-${content.length}`}>
        {bulletItems.map((item, index) => (
          <li key={index}>{formatInlineMarkdown(item)}</li>
        ))}
      </ul>,
    );
    bulletItems = [];
  };

  text.split("\n").forEach((line, index) => {
    const bullet = line.match(/^\s*[*-]\s+(.+)$/);
    if (bullet) {
      bulletItems.push(bullet[1]);
      return;
    }

    addBulletList();
    if (line.trim()) {
      content.push(<p key={`line-${index}`}>{formatInlineMarkdown(line)}</p>);
    }
  });

  addBulletList();
  return <div className="assistant-text">{content}</div>;
}

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Karan's Personal AI Assistant. Ask me anything about Karan",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [now, setNow] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const initialTimerId = window.setTimeout(() => setNow(new Date()), 0);
    const timerId = window.setInterval(() => setNow(new Date()), 15000);
    return () => {
      window.clearTimeout(initialTimerId);
      window.clearInterval(timerId);
    };
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim() || loading) return;

    const userQuestion = input.trim();
    setMessages((previous) => [
      ...previous,
      { sender: "user", text: userQuestion },
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        throw new Error(`The assistant returned an error (${response.status}).`);
      }

      const data = await response.json();
      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: data.answer || "Sorry, I couldn't get an answer.",
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text:
            error instanceof Error && error.message
              ? `Unable to reach the assistant. ${error.message}`
              : "Unable to reach the assistant. Check that the FastAPI server is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (label) => {
    setActiveMenu((current) => (current === label ? "" : label));
    if (label === "Projects") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      setActiveMenu("");
    }
  };

  const askAbout = (topic) => {
    setInput(`Tell me about Karan's ${topic}.`);
    setActiveMenu("");
    inputRef.current?.focus();
  };

  const dateParts = now
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(now)
    : [];
  const getDatePart = (type) =>
    dateParts.find((part) => part.type === type)?.value ?? "";
  const dateLabel = now
    ? `${getDatePart("weekday")} ${getDatePart("day")} ${getDatePart("month")} ${getDatePart("hour")}:${getDatePart("minute")} ${getDatePart("dayPeriod").toUpperCase()}`
    : "";

  return (
    <main className={darkMode ? "desktop dark-mode" : "desktop"}>
      <header className="menu-bar">
        <div className="menu-left">
          <button
            className="apple-button"
            type="button"
            aria-label="About this desktop"
            onClick={() =>
              setActiveMenu((current) => (current === "About" ? "" : "About"))
            }
          >
            <Icon name="apple" />
          </button>
          <span className="menu-title">Karan&apos;s Personal AI Assistant</span>
          <nav className="menu-links" aria-label="Desktop menu">
            {Object.keys(menuDetails).map((label) => (
              <button
                className={activeMenu === label ? "menu-link active" : "menu-link"}
                key={label}
                type="button"
                onClick={() => handleMenuClick(label)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="menu-right">
          <button
            className="status-button"
            type="button"
            aria-label="Wi-Fi connected"
          >
            <Icon name="wifi" />
          </button>
          <button
            className="status-button"
            type="button"
            aria-label="Search skills"
            onClick={() => askAbout("skills")}
          >
            <Icon name="search" />
          </button>
          <button
            className="status-button"
            type="button"
            aria-label="Control Center"
            onClick={() =>
              setActiveMenu((current) => (current === "About" ? "" : "About"))
            }
          >
            <Icon name="controls" />
          </button>
          <button
            className="theme-toggle"
            type="button"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((current) => !current)}
          >
            <Icon name={darkMode ? "sun" : "moon"} />
          </button>
          <time className="menu-clock" dateTime={now ? now.toISOString() : undefined}>
            {dateLabel}
          </time>
        </div>

        {activeMenu && activeMenu !== "About" && (
          <div className="menu-popover">
            <strong>{activeMenu}</strong>
            <p>{menuDetails[activeMenu]}</p>
            {activeMenu !== "Projects" && (
              <button
                className="popover-action"
                type="button"
                onClick={() => askAbout(activeMenu.toLowerCase())}
              >
                Ask the assistant <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>
        )}
        {activeMenu === "About" && (
          <div className="menu-popover about-popover">
            <strong>Desktop controls</strong>
            <p>Your personal AI workspace is ready.</p>
            <button
              className="popover-action"
              type="button"
              onClick={() => setActiveMenu("")}
            >
              Done
            </button>
          </div>
        )}
      </header>

      <nav className="profile-shortcuts" aria-label="Karan's profiles">
        {profileLinks.map((profile) => (
          <a
            className="profile-shortcut"
            href={profile.href}
            key={profile.name}
            target="_blank"
            rel="noreferrer"
          >
            <span className={`profile-app profile-${profile.name.toLowerCase()}`}>
              {profile.initials}
            </span>
            <span className="profile-label">{profile.name}</span>
          </a>
        ))}
      </nav>

      <section className="assistant-window" aria-label="AI assistant chat">
        <div className="window-titlebar">
          <div className="traffic-lights" aria-label="Window controls">
            <span className="traffic-light red" />
            <span className="traffic-light yellow" />
            <span className="traffic-light green" />
          </div>
          <div className="window-heading">
            <span className="assistant-mark" aria-hidden="true">✦</span>
            <div>
              <h1>Karan&apos;s AI Assistant</h1>
              <p>Portfolio · Always here to help</p>
            </div>
          </div>
          <span className="window-status"><i /> Online</span>
        </div>

        <div className="chat-box" aria-live="polite">
          {messages.map((message, index) => (
            <div
              className={`message-row ${message.sender}`}
              key={`${message.sender}-${index}`}
            >
              {message.sender === "bot" && (
                <span className="bot-avatar" aria-hidden="true">✦</span>
              )}
              <div className={`message ${message.sender}`}>
                <span className="message-label">
                  {message.sender === "user" ? "You" : "AI"}
                </span>
                {message.sender === "bot" ? (
                  renderAssistantMessage(message.text)
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-row bot">
              <span className="bot-avatar" aria-hidden="true">✦</span>
              <div className="message bot typing-message">
                <span className="message-label">AI</span>
                <p>Thinking<span className="typing-dots">...</span></p>
              </div>
            </div>
          )}
        </div>

        <form className="input-area" onSubmit={sendMessage}>
          <input
            ref={inputRef}
            aria-label="Ask the AI assistant"
            type="text"
            placeholder="Ask about projects, skills, or experience..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send <span aria-hidden="true">↑</span>
          </button>
        </form>
        <div className="window-footnote">Powered by Karan&apos;s portfolio</div>
      </section>

      <nav className="dock" id="projects" aria-label="Project repositories">
        {projects.map((project, index) => (
          <a
            className="dock-item"
            key={project.name}
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            title={project.fullName}
            aria-label={`Open ${project.fullName} repository on GitHub`}
          >
            <span className={`folder-icon folder-${index + 1}`} aria-hidden="true">
              <span className="folder-tab" />
              <span className="folder-face">✦</span>
            </span>
            <span className="dock-tooltip">{project.name}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}

export default App;
