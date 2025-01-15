import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressTracker from "./components/ProgressTracker";
import ProjectAssessment from "./components/ProjectAssessment";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Use solid colors here for MUI theme
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={sidebarOpen} />
          <Layout sidebarOpen={sidebarOpen}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ProjectAssessment" element={<ProjectAssessment />} />
              <Route path="/ProgressTracker" element={<ProgressTracker />} />
            </Routes>
          </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
