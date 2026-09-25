import React, { useEffect, useState } from "react";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Documents from "./components/Documents";
import UploadPage from "./components/UploadPage";
import DocumentStudy from "./components/DocumentStudy";
import Analysis from "./components/Analysis";
import QuizSetup from "./components/QuizSetup";
import QuizRun from "./components/QuizRun";
import QuizResult from "./components/QuizResult";
import SummaryPage from "./components/SummaryPage";
import ChatPage from "./components/Chat";
import Flashcards from "./components/Flashcards";
import MockExamIntro from "./components/MockExam";
import Planner from "./components/Planner";
import ProgressPage from "./components/Progress";
import SettingsPage from "./components/Settings";
import AuthPage from "./components/AuthPage";
import { Toast } from "./components/UI";
import { useAuth } from "./context/AuthContext";

function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const [entered, setEntered] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [quizConfig, setQuizConfig] = useState({ topic: "All Topics", difficulty: "Medium", count: 10, qtype: "MCQ" });
  const [quizResult, setQuizResult] = useState(null);
  const [toast, setToast] = useState(null);
  const { user, accessToken, isInitializing } = useAuth();

  if (path === "/auth/login" || path === "/auth/register") {
    return <AuthPage mode={path.endsWith("register") ? "register" : "login"} />;
  }

  if (isInitializing) return <div className="sa-root min-h-screen flex items-center justify-center text-sm" style={{ color: "var(--muted)" }}>Restoring your session...</div>;
  if (path === "/dashboard" && !user) {
    window.history.replaceState({}, "", "/auth/login");
    return <AuthPage mode="login" />;
  }

  const showToast = (msg) => setToast(msg);
  const go = (p) => { setPage(p); setMobileOpen(false); };
  const openDashboard = () => {
    if (user) {
      window.history.pushState({}, "", "/dashboard");
      setPath("/dashboard");
      setEntered(true);
    } else {
      window.history.pushState({}, "", "/auth/login");
      setPath("/auth/login");
    }
  };

  if (!entered && path !== "/dashboard") return (
    <div className="sa-root">
      <Landing onEnter={openDashboard} />
    </div>
  );

  const titles = {
    dashboard: ["Dashboard", null],
    documents: ["My Documents", null],
    upload: ["Upload Material", null],
    "document-study": ["Study Document", null],
    analysis: ["Document Analysis", null],
    "quiz-setup": ["Quiz Generator", null],
    "quiz-run": ["Quiz", null],
    "quiz-result": ["Quiz Result", null],
    summary: ["Summaries", null],
    chat: ["AI Chat", null],
    flashcards: ["Flashcards", null],
    "mock-exam": ["Mock Exams", null],
    planner: ["Study Planner", null],
    progress: ["Progress", null],
    settings: ["Settings", null],
  };
  const activeNavId = page.startsWith("quiz") ? "quiz-setup" : page === "analysis" || page === "upload" || page === "document-study" ? "documents" : page === "mock-exam" ? "mock-exam" : page;

  let body;
  if (page === "dashboard") body = <Dashboard go={go} showToast={showToast} selectDoc={setSelectedDoc} accessToken={accessToken} />;
  else if (page === "documents") body = <Documents go={go} showToast={showToast} selectDoc={setSelectedDoc} accessToken={accessToken} />;
  else if (page === "upload") body = <UploadPage go={go} showToast={showToast} accessToken={accessToken} />;
  else if (page === "document-study") body = <DocumentStudy go={go} doc={selectedDoc} selectDoc={setSelectedDoc} accessToken={accessToken} showToast={showToast} />;
  else if (page === "analysis") body = <Analysis go={go} doc={selectedDoc} selectDoc={setSelectedDoc} accessToken={accessToken} />;
  else if (page === "quiz-setup") body = <QuizSetup go={go} config={quizConfig} setConfig={setQuizConfig} />;
  else if (page === "quiz-run") body = <QuizRun go={go} config={quizConfig} onFinish={(r) => { setQuizResult(r); go("quiz-result"); }} />;
  else if (page === "quiz-result") body = <QuizResult go={go} result={quizResult} showToast={showToast} />;
  else if (page === "summary") body = <SummaryPage go={go} accessToken={accessToken} />;
  else if (page === "chat") body = <ChatPage />;
  else if (page === "flashcards") body = <Flashcards showToast={showToast} accessToken={accessToken} go={go} selectDoc={setSelectedDoc} />;
  else if (page === "mock-exam") body = <MockExamIntro go={go} setQuizConfig={setQuizConfig} />;
  else if (page === "planner") body = <Planner go={go} showToast={showToast} selectDoc={setSelectedDoc} accessToken={accessToken} />;
  else if (page === "progress") body = <ProgressPage go={go} />;
  else if (page === "settings") body = <SettingsPage showToast={showToast} />;

  return (
    <div className="sa-root h-screen flex overflow-hidden">
      <Sidebar page={activeNavId} setPage={go} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={titles[page]?.[0] || "ExamVault"} subtitle={null} onMenuClick={() => setMobileOpen(true)} />
        <div className="flex-1 overflow-y-auto sa-scroll p-4 md:p-8">
          {body}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
