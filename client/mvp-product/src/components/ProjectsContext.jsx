import { createContext, useContext } from "react";

export const ProjectsContext = createContext(null);

export const useProjects = () => {
  const context = useContext(ProjectsContext);

  if (context === null) {
    throw new Error("useProjects must be used within ProjectsContext.Provider");
  }

  return context;
};

// ProjectsContext is a React mechanism for sharing project data and actions between components without passing them through every component in between.

// In ProjectsContext.jsx, useProjects() lets components access that shared project data. The professor pages use it to create, edit, and delete projects; the student page uses it to display them.

// Context itself doesn’t save data. In this app, project data is saved to browser storage in App.jsx, so it can survive a refresh.
