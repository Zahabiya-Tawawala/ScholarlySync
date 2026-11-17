import { useState } from "react";
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  FolderOpen as FolderIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useProjects } from "./ProjectsContext";

const emptyProject = {
  title: "",
  course: "",
  description: "",
  requirements: "",
  dueDate: "",
};

const ProfessorDashboard = () => {
  const { projects, createProject } = useProjects();
  const [form, setForm] = useState(emptyProject);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject({ ...form, id: Date.now() });
    setForm(emptyProject);
    setShowSuccess(true);
  };

  return (
    <Box
      id="professor-overview"
      sx={{ maxWidth: 1200, mx: "auto", scrollMarginTop: "88px" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Professor workspace
          </Typography>
          <Typography color="text.secondary">
            Create and share project briefs with your students.
          </Typography>
        </Box>
        <Chip
          icon={<SchoolIcon />}
          label="Professor"
          color="primary"
          variant="outlined"
        />
      </Stack>

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
              <Alert severity="info" sx={{ mt: 3 }}>
                This preview keeps projects in memory only. Add Firebase later
                to save them and share across student accounts.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box id="published-projects" sx={{ mt: 4, scrollMarginTop: "88px" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Published projects
        </Typography>
        {projects.length === 0 ? (
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
                <Card sx={{ height: "100%", borderRadius: 3 }}>
                  <CardContent>
                    <Chip
                      label={project.course}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, whiteSpace: "pre-wrap" }}
                    >
                      {project.description}
                    </Typography>
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
                </Card>
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
