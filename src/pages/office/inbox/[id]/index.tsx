import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
} from "@mui/material";

const InquiryDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [inquiry, setInquiry] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/inquiries?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setInquiry(data.inquiry || data);
        })
        .catch((err) => console.error("Error loading inquiry:", err));
    }
  }, [id]);

  if (!inquiry) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: "100vh" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h5" fontWeight={700}>
          Inquiry Details
        </Typography>
        <Button variant="outlined" onClick={() => router.push("/office/inbox")}>
          Back to Inbox
        </Button>
      </Box>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Section 1: Basic Info */}
          <Box display="flex" flexWrap="wrap" gap={3}>
            <CardField label="Name" value={inquiry.name} />
            <CardField label="Email" value={inquiry.email} />
            <CardField label="Country" value={inquiry.country} />
            <CardField label="Company" value={inquiry.company} />
          </Box>

          {/* Section 2: Details */}
          <Box display="flex" flexWrap="wrap" gap={3}>
            <CardField label="Address" value={inquiry.address} />
            <CardField label="Title" value={inquiry.title} />
            <CardField label="Job" value={inquiry.job} />
            <CardField
              label="Submitted At"
              value={new Date(inquiry.createdAt).toLocaleString()}
            />
          </Box>

          {/* Section 3: Message */}
          <Divider />
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
            >
              Message
            </Typography>
            <Typography
              sx={{
                whiteSpace: "pre-line",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              {inquiry.message}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// 🧩 Reusable Dashboard-style Card Field
const CardField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <Box width={{ xs: "100%", sm: "45%" }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography
      variant="body1"
      fontWeight={600}
      sx={{ color: "#333", wordBreak: "break-word" }}
    >
      {value}
    </Typography>
  </Box>
);

export default InquiryDetailPage;
