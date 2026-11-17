import {
  AssignmentTurnedIn as AssessmentIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const ProfessorAssessment = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Assessment
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Review student submissions and provide feedback.
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <AssessmentIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h6">Assessment tools are coming soon</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
              This area will let professors review project submissions and
              provide feedback. Submission management has not been connected
              yet.
            </Typography>
            <Alert severity="info" sx={{ width: "100%", textAlign: "left" }}>
              For now, you can create projects and share their briefs with
              students from the Projects section.
            </Alert>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfessorAssessment;
