import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressTracker from "./components/ProgressTracker";
import ProjectAssessment from "./components/ProjectAssessment";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function AppContent() {
  const isMobile = useMediaQuery("(max-width: 899px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />
      <Layout sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ProjectAssessment" element={<ProjectAssessment />} />
          <Route path="/ProgressTracker" element={<ProgressTracker />} />
        </Routes>
      </Layout>
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
