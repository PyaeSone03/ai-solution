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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const handleExportExcel = () => {
    if (!inquiry) return;

    const exportData = [
      {
        Name: inquiry.name,
        Email: inquiry.email,
        Country: inquiry.country,
        Company: inquiry.company,
        Address: inquiry.address,
        Title: inquiry.title,
        Job: inquiry.job,
        Message: inquiry.message,
        SubmittedAt: new Date(inquiry.createdAt).toLocaleString(),
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiry");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `inquiry-${inquiry.id}.xlsx`);
  };

  const handleExportPDF = () => {
    if (!inquiry) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Inquiry Details", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Name", inquiry.name],
        ["Email", inquiry.email],
        ["Country", inquiry.country],
        ["Company", inquiry.company],
        ["Address", inquiry.address],
        ["Title", inquiry.title],
        ["Job", inquiry.job],
        ["Message", inquiry.message],
        ["Submitted At", new Date(inquiry.createdAt).toLocaleString()],
      ],
      styles: {
        cellPadding: 2,
        fontSize: 10,
      },
    });

    doc.save(`inquiry-${inquiry.id}.pdf`);
  };

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
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="outlined" onClick={() => router.push("/office/inbox")}>
            Back to Inbox
          </Button>
          <Button variant="contained" onClick={handleExportExcel}>
            Export to Excel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleExportPDF}>
            Export to PDF
          </Button>
        </Box>
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
