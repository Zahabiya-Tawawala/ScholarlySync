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

const projectsStorageKey = "scholarly-sync-projects";

// Give a fresh browser a sample project to view in both role portals.
const demoProjects = [
  {
    id: "demo-project",
    title: "Build a Personal Portfolio",
    course: "Web Development",
    description:
      "Create a responsive portfolio website that introduces you and showcases your work.",
    requirements:
      "Include an About section, at least two projects, and contact information.",
    dueDate: "",
  },
];

const isProject = (project) =>
  project !== null &&
  typeof project === "object" &&
  (typeof project.id === "string" || typeof project.id === "number") &&
  typeof project.title === "string" &&
  typeof project.course === "string" &&
  typeof project.description === "string" &&
  (project.requirements === undefined ||
    typeof project.requirements === "string") &&
  (project.dueDate === undefined || typeof project.dueDate === "string");

const readInitialProjects = () => {
  try {
    const storedProjects = window.localStorage.getItem(projectsStorageKey);
    if (storedProjects === null) {
      return { projects: demoProjects, error: null };
    }

    const parsedProjects = JSON.parse(storedProjects);
    if (!Array.isArray(parsedProjects) || !parsedProjects.every(isProject)) {
      throw new Error("The saved project list has an invalid format.");
    }

    return { projects: parsedProjects, error: null };
  } catch (error) {
    console.error("Unable to load saved projects:", error);
    return {
      projects: demoProjects,
      error: "Saved projects could not be loaded. Showing the demo project.",
    };
  }
};

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
  const [projectState, setProjectState] = useState(readInitialProjects);
  const { projects, error } = projectState;

  // Persist each change before updating React state so failed saves are visible.
  const saveProjects = (updatedProjects) => {
    try {
      window.localStorage.setItem(
        projectsStorageKey,
        JSON.stringify(updatedProjects),
      );
      setProjectState({ projects: updatedProjects, error: null });
      return true;
    } catch (storageError) {
      console.error("Unable to save projects:", storageError);
      setProjectState((currentState) => ({
        ...currentState,
        error: "Project changes could not be saved in this browser.",
      }));
      return false;
    }
  };

  const createProject = (project) => {
    return saveProjects([project, ...projects]);
  };

  const updateProject = (projectId, changes) => {
    if (!projects.some((project) => project.id === projectId)) {
      setProjectState((currentState) => ({
        ...currentState,
        error: "That project no longer exists. Refresh and try again.",
      }));
      return false;
    }

    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, ...changes } : project,
    );
    return saveProjects(updatedProjects);
  };

  const deleteProject = (projectId) => {
    if (!projects.some((project) => project.id === projectId)) {
      setProjectState((currentState) => ({
        ...currentState,
        error: "That project no longer exists. Refresh and try again.",
      }));
      return false;
    }

    const updatedProjects = projects.filter(
      (project) => project.id !== projectId,
    );
    return saveProjects(updatedProjects);
  };

  useEffect(() => {
    // Keep other open tabs in sync when a project changes in this browser.
    const handleStorageChange = (event) => {
      if (event.key !== projectsStorageKey || event.newValue === null) {
        return;
      }

      try {
        const updatedProjects = JSON.parse(event.newValue);
        if (!Array.isArray(updatedProjects) || !updatedProjects.every(isProject)) {
          throw new Error("The saved project list has an invalid format.");
        }

        // Keep open student and professor tabs in sync with browser storage.
        setProjectState({ projects: updatedProjects, error: null });
      } catch (storageError) {
        console.error("Unable to read project changes from another tab:", storageError);
        setProjectState((currentState) => ({
          ...currentState,
          error: "Project changes from another tab could not be loaded.",
        }));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <ProjectsContext.Provider
        value={{ projects, createProject, updateProject, deleteProject }}
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
          onClose={() =>
            setProjectState((currentState) => ({
              ...currentState,
              error: null,
            }))
          }
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() =>
              setProjectState((currentState) => ({
                ...currentState,
                error: null,
              }))
            }
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
