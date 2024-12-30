import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressTracker from "./components/ProgressTracker";
import ProjectAssessment from "./components/ProjectAssessment";
import Dashboard from "./components/Dashboard";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element= {<Dashboard/>} />
          <Route path="/ProjectAssessment" element= {<ProjectAssessment/>} />
          <Route path="/ProgressTracker" element= {<ProgressTracker/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
