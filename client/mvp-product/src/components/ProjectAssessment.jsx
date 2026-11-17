import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProjectCard from "./Card";
import { useProjects } from "./ProjectsContext";

const ProjectAssessment = () => {
  const { projects } = useProjects();

  return (
    <Box>
      {projects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Projects from your professors
          </Typography>
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card sx={{ height: "100%", borderRadius: 3 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={1}
                      sx={{ mb: 1 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {project.title}
                      </Typography>
                      <Chip label="New" size="small" color="primary" />
                    </Stack>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ mb: 1 }}
                    >
                      {project.course}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "pre-wrap" }}
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
        </Box>
      )}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Project submissions
      </Typography>
      <ProjectCard />
    </Box>
  );
};

export default ProjectAssessment;
