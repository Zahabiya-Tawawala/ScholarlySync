import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Snackbar } from "@mui/material";
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
import {
  createFirebaseProject,
  deleteFirebaseProject,
  subscribeToProjects,
  updateFirebaseProject,
} from "./services/projectsService";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realtime Database pushes updates to this listener for both role portals.
    return subscribeToProjects(
      (remoteProjects) => {
        setProjects(remoteProjects);
        setLoading(false);
        setError(null);
      },
      (loadError) => {
        console.error("Unable to load Firebase projects:", loadError);
        setError(`Unable to load Firebase projects: ${loadError.message}`);
        setLoading(false);
      },
    );
  }, []);

  const runProjectChange = async (change) => {
    try {
      await change();
      setError(null);
      return true;
    } catch (changeError) {
      console.error("Unable to save Firebase project changes:", changeError);
      setError(`Unable to save project changes: ${changeError.message}`);
      return false;
    }
  };

  const createProject = (project) =>
    runProjectChange(() => createFirebaseProject(project));
  const updateProject = (projectId, changes) =>
    runProjectChange(() => updateFirebaseProject(projectId, changes));
  const deleteProject = (projectId) =>
    runProjectChange(() => deleteFirebaseProject(projectId));

  return (
    <BrowserRouter>
      <ProjectsContext.Provider
        value={{ projects, loading, createProject, updateProject, deleteProject }}
      >
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
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={5000}
          onClose={() => setError(null)}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        </Snackbar>
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
