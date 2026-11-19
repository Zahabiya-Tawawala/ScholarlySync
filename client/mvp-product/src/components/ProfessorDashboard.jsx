import { useState } from "react";
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  FolderOpen as FolderIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useProjects } from "./ProjectsContext";
import ProfessorProjectCard from "./ProfessorProjectCard";

const emptyProject = {
  title: "",
  course: "",
  description: "",
  requirements: "",
  dueDate: "",
};

const ProfessorDashboard = () => {
  const { projects, loading, createProject } = useProjects();
  const [form, setForm] = useState(emptyProject);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saved = await createProject(form);
    if (!saved) {
      return;
    }

    setForm(emptyProject);
    setShowSuccess(true);
  };

  return (
    <Box
      id="professor-overview"
      sx={{ maxWidth: 1200, mx: "auto", scrollMarginTop: "88px" }}
    >
      <Card
        sx={{
          mb: 3,
          color: "white",
          borderRadius: 3,
          background: "linear-gradient(115deg, #657ff0, #9b70e8)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            "&:last-child": { pb: { xs: 2.5, sm: 3.5 } },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FolderIcon sx={{ fontSize: 42 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Your teaching hub
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Projects you create here will appear in the student Projects
                view in this demo session.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={8}>
          <Card
            id="create-project"
            sx={{
              height: "100%",
              borderRadius: 3,
              scrollMarginTop: "88px",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Create a project
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2.5 }}
              >
                Add the details students need to get started.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="title"
                      label="Project title"
                      placeholder="e.g. Build a portfolio website"
                      value={form.title}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="course"
                      label="Course or class"
                      placeholder="e.g. Web Development 101"
                      value={form.course}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Project description"
                      placeholder="Explain the goal and what students will learn."
                      value={form.description}
                      onChange={handleChange}
                      required
                      fullWidth
                      multiline
                      minRows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="requirements"
                      label="Requirements or submission instructions"
                      placeholder="List the expected deliverables and how to submit."
                      value={form.requirements}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      minRows={3}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="dueDate"
                      label="Due date"
                      type="date"
                      value={form.dueDate}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        px: 3,
                        py: 1.25,
                        background:
                          "linear-gradient(100deg, #657ff0, #9b70e8)",
                      }}
                    >
                      Publish project
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              backgroundColor: "#f7f8ff",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <CalendarIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Workspace overview
                </Typography>
              </Stack>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {projects.length}
              </Typography>
              <Typography color="text.secondary">
                {projects.length === 1 ? "project published" : "projects published"}
              </Typography>
              <Alert severity={loading ? "info" : "success"} sx={{ mt: 3 }}>
                {loading
                  ? "Connecting to Firebase and loading projects."
                  : "Projects are stored in Firebase and shared with the student Projects view."}
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box id="published-projects" sx={{ mt: 4, scrollMarginTop: "88px" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Published projects
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress aria-label="Loading projects" />
          </Box>
        ) : projects.length === 0 ? (
          <Card sx={{ borderRadius: 3, border: "1px dashed #c5c9d8" }}>
            <CardContent sx={{ textAlign: "center", py: 5 }}>
              <FolderIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">No projects yet</Typography>
              <Typography color="text.secondary">
                Complete the form above to publish your first project.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} lg={4} key={project.id}>
                <ProfessorProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3500}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSuccess(false)}
        >
          Project published to the student Projects view.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfessorDashboard;
