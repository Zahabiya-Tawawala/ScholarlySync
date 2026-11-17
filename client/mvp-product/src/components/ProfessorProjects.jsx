import { Link } from "react-router-dom";
import {
  Add as AddIcon,
  FolderOpen as FolderIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useProjects } from "./ProjectsContext";

const ProfessorProjects = () => {
  const { projects } = useProjects();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Projects
          </Typography>
          <Typography color="text.secondary">
            Review the project briefs you have published.
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/professor/dashboard"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create project
        </Button>
      </Stack>

      {projects.length === 0 ? (
        <Card sx={{ borderRadius: 3, border: "1px dashed #c5c9d8" }}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <FolderIcon color="action" sx={{ fontSize: 42, mb: 1 }} />
            <Typography variant="h6">No projects published yet</Typography>
            <Typography color="text.secondary">
              Create a project from your professor dashboard to see it here.
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
                  {project.requirements && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 2, whiteSpace: "pre-wrap" }}
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
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProfessorProjects;
