import { AssignmentTurnedIn as AssessmentIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const StudentAssessment = () => (
  <Box sx={{ maxWidth: 1000, mx: "auto" }}>
    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
      Assessment
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      View assessment results and feedback from your professors.
    </Typography>
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <AssessmentIcon color="primary" sx={{ fontSize: 48 }} />
          <Typography variant="h6">Assessment is coming soon</Typography>
          <Alert severity="info" sx={{ width: "100%", textAlign: "left" }}>
            Grades and professor feedback will appear here when assessment
            features are available.
          </Alert>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default StudentAssessment;
