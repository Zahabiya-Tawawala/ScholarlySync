import { createContext, useContext } from "react";

export const ProjectsContext = createContext(null);

export const useProjects = () => {
  const context = useContext(ProjectsContext);

  if (context === null) {
    throw new Error("useProjects must be used within ProjectsContext.Provider");
  }

  return context;
};
