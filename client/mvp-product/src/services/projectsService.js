import {
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { database } from "../firebase/firebase";

const projectsPath = "projects";

const normalizeProject = (id, value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Firebase project "${id}" has an invalid record.`);
  }

  // Accept both the current UI fields and the snake_case fields in the first Firebase sample.
  const project = {
    id,
    title: value.title ?? value.project_title,
    course: value.course,
    description: value.description ?? value.project_description,
    requirements: value.requirements ?? "",
    dueDate: value.dueDate ?? value.due_date ?? "",
  };

  if (
    typeof project.title !== "string" ||
    typeof project.course !== "string" ||
    typeof project.description !== "string" ||
    typeof project.requirements !== "string" ||
    typeof project.dueDate !== "string"
  ) {
    throw new Error(`Firebase project "${id}" is missing required text fields.`);
  }

  return project;
};

const toFirebaseProject = (project) => {
  if (
    typeof project.title !== "string" ||
    typeof project.course !== "string" ||
    typeof project.description !== "string"
  ) {
    throw new Error("Project title, course, and description are required.");
  }

  return {
    title: project.title.trim(),
    course: project.course.trim(),
    description: project.description.trim(),
    requirements:
      typeof project.requirements === "string"
        ? project.requirements.trim()
        : "",
    dueDate: typeof project.dueDate === "string" ? project.dueDate : "",
  };
};

export const subscribeToProjects = (onProjects, onError) =>
  onValue(
    ref(database, projectsPath),
    (snapshot) => {
      try {
        const records = snapshot.val() || {};
        if (typeof records !== "object" || Array.isArray(records)) {
          throw new Error("The Firebase projects node must be an object.");
        }

        onProjects(
          Object.entries(records).map(([id, value]) =>
            normalizeProject(id, value),
          ),
        );
      } catch (error) {
        onError(error);
      }
    },
    onError,
  );

export const createFirebaseProject = async (project) => {
  const projectRef = push(ref(database, projectsPath));
  if (!projectRef.key) {
    throw new Error("Firebase could not generate a project ID.");
  }

  await set(projectRef, {
    ...toFirebaseProject(project),
    createdAt: new Date().toISOString(),
  });
  return projectRef.key;
};

export const updateFirebaseProject = async (projectId, project) => {
  await update(
    ref(database, `${projectsPath}/${projectId}`),
    toFirebaseProject(project),
  );
};

export const deleteFirebaseProject = async (projectId) => {
  await remove(ref(database, `${projectsPath}/${projectId}`));
};
