import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Sidebar } from "./components/Layout/Sidebar";
import { Header } from "./components/Layout/Header";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { CalendarPage } from "./pages/CalendarPage";
import { KanbanPage } from "./pages/KanbanPage";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { useTheme } from "./contexts/ThemeContext";

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "calendar":
        return <CalendarPage />;
      case "kanban":
        return <KanbanPage />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: theme.background }}
    >
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
