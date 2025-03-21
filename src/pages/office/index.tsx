import { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const Dashboard = () => {
  const [roleID, setRoleID] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [totalInquiries, setTotalInquiries] = useState<number>(0);
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(0);
  const [yearlyInquiries, setYearlyInquiries] = useState<number>(0);

  useEffect(() => {
    setRoleID(localStorage.getItem("roleID"));
    setUsername(localStorage.getItem("userName"));

    const fetchInquiryStats = async () => {
      try {
        const res = await fetch("/api/inquiries?count=true");
        const data = await res.json();
        setTotalInquiries(data.total || 0);
        setMonthlyInquiries(data.thisMonth || 0);
        setYearlyInquiries(data.thisYear || 0);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiryStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 6, mx: "auto" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        px={2}
        py={2}
        sx={{
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          📊 Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem", fontWeight: 500 }}
          >
            Role:
            <Box
              component="span"
              fontWeight={600}
              color="text.primary"
              display="inline"
            >
              {roleID === "admin" ? "Admin" : roleID}
            </Box>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem", fontWeight: 500 }}
          >
            Name:
            <Box
              component="span"
              fontWeight={600}
              color="text.primary"
              display="inline"
            >
              {username}
            </Box>
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <SupportAgentIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Total Inquiries</Typography>
              <Typography variant="h6">{totalInquiries}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "#2e7d32", mr: 2 }}>
              <DateRangeIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">This Month</Typography>
              <Typography variant="h6">{monthlyInquiries}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "#ff8f00", mr: 2 }}>
              <CalendarTodayIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">This Year</Typography>
              <Typography variant="h6">{yearlyInquiries}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Recent Activity
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2">
                  Inquiry received from Jane Doe
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  New account created by staff
                </Typography>
              </li>
              <li>
                <Typography variant="body2">Admin logged in</Typography>
              </li>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              System Notifications
            </Typography>
            <Typography variant="body2">⚠️ Backup not yet scheduled</Typography>
            <Typography variant="body2">
              ✅ All services running normally
            </Typography>
            <Typography variant="body2">
              📅 Next audit: 25 March 2025
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Quick Tips
            </Typography>
            <Typography variant="body2">• Use strong passwords</Typography>
            <Typography variant="body2">
              • Respond to inquiries within 24hrs
            </Typography>
            <Typography variant="body2">
              • Keep user roles up to date
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Top Performing Staff
            </Typography>
            <Typography variant="body2">
              🏆 Aung Min Htet - 15 Inquiries
            </Typography>
            <Typography variant="body2">🥈 Kyaw Zin - 12 Inquiries</Typography>
            <Typography variant="body2">🥉 Moe Moe - 10 Inquiries</Typography>
          </Paper>
        </Grid>

        {/* Upcoming Reminders */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Upcoming Reminders
            </Typography>
            <Typography variant="body2">
              📝 Follow up with Myanmar Co. - Mar 25
            </Typography>
            <Typography variant="body2">
              📞 Call back Japan Client - Mar 28
            </Typography>
            <Typography variant="body2">
              🗓️ Export Summary Report - Mar 30
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              System Status
            </Typography>
            <Typography variant="body2">✅ API is up and running</Typography>
            <Typography variant="body2">✅ Database connected</Typography>
            <Typography variant="body2">
              ✅ No errors reported in last 24h
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
