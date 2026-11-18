import { useState } from "react";
import PropTypes from "prop-types";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useProjects } from "./ProjectsContext";

const ProfessorProjectCard = ({ project }) => {
  const { updateProject, deleteProject } = useProjects();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [draft, setDraft] = useState(project);

  const openEditor = () => {
    // Edit a draft so Cancel leaves the published project unchanged.
    setDraft({ ...project });
    setEditOpen(true);
  };

  const handleChange = (event) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (updateProject(project.id, draft)) {
      setEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (deleteProject(project.id)) {
      setDeleteOpen(false);
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", borderRadius: 3, display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Chip
            label={project.course}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
          >
            {project.description}
          </Typography>
          {project.requirements && (
            <Typography
              variant="body2"
              sx={{ mt: 2, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
            >
              <strong>Requirements:</strong> {project.requirements}
            </Typography>
          )}
          {project.dueDate && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              Due {project.dueDate}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={openEditor}
            aria-label={`Edit ${project.title}`}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteOpen(true)}
            aria-label={`Delete ${project.title}`}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby={`edit-project-title-${project.id}`}
      >
        <DialogTitle id={`edit-project-title-${project.id}`}>
          Edit project
        </DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id={`edit-project-form-${project.id}`}
            onSubmit={handleUpdate}
            spacing={2}
            sx={{ pt: 1 }}
          >
            <TextField
              name="title"
              label="Project title"
              value={draft.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="course"
              label="Course or class"
              value={draft.course}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="Project description"
              value={draft.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              name="requirements"
              label="Requirements or submission instructions"
              value={draft.requirements || ""}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              name="dueDate"
              label="Due date"
              type="date"
              value={draft.dueDate || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button type="submit" form={`edit-project-form-${project.id}`} variant="contained">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby={`delete-project-title-${project.id}`}
        aria-describedby={`delete-project-description-${project.id}`}
      >
        <DialogTitle id={`delete-project-title-${project.id}`}>
          Delete project?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={`delete-project-description-${project.id}`}>
            “{project.title}” will be removed from both the professor and
            student project lists. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete project
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ProfessorProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    requirements: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
};

export default ProfessorProjectCard;
