import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressTracker from "./components/ProgressTracker";
import ProjectAssessment from "./components/ProjectAssessment";
import Dashboard from "./components/Dashboard";
import ProfessorDashboard from "./components/ProfessorDashboard";
import ProfessorProjects from "./components/ProfessorProjects";
import ProfessorAssessment from "./components/ProfessorAssessment";
import ProfessorLayout from "./components/ProfessorLayout";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import { ProjectsContext } from "./components/ProjectsContext";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function StudentPortal() {
  const isMobile = useMediaQuery("(max-width: 899px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />
      <Layout sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <Outlet />
      </Layout>
    </>
  );
}

function AppContent() {
  const [projects, setProjects] = useState([]);

  const createProject = (project) => {
    setProjects((currentProjects) => [project, ...currentProjects]);
  };

  return (
    <BrowserRouter>
      <ProjectsContext.Provider value={{ projects, createProject }}>
        <Routes>
          <Route
            path="/professor"
            element={<ProfessorLayout />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ProfessorDashboard />} />
            <Route path="projects" element={<ProfessorProjects />} />
            <Route path="assessment" element={<ProfessorAssessment />} />
            <Route
              path="*"
              element={<Navigate to="/professor/dashboard" replace />}
            />
          </Route>
          <Route element={<StudentPortal />}>
            <Route index element={<Dashboard />} />
            <Route path="student">
              <Route index element={<Dashboard />} />
              <Route
                path="project-assessment"
                element={<ProjectAssessment />}
              />
              <Route
                path="progress-tracker"
                element={<ProgressTracker />}
              />
            </Route>
            <Route
              path="ProjectAssessment"
              element={
                <Navigate to="/student/project-assessment" replace />
              }
            />
            <Route
              path="ProgressTracker"
              element={<Navigate to="/student/progress-tracker" replace />}
            />
            <Route
              path="*"
              element={<Navigate to="/student" replace />}
            />
          </Route>
        </Routes>
      </ProjectsContext.Provider>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
