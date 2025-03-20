import ProtectedRoute from "../components/ProtectedRoute";
import { Typography, Container, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, mt: 8, textAlign: "center" }}>
          <Typography variant="h4">Welcome to the Office Dashboard</Typography>
        </Paper>
      </Container>
    </ProtectedRoute>
  );
};

export default Dashboard;
