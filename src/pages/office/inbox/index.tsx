import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

const InboxPage = () => {
  const [inquiries, setInquiries] = useState<
    {
      id: string;
      name: string;
      email: string;
      address: string;
      country: string;
      company: string;
      title: string;
      job: string;
      message: string;
      createdAt: string;
    }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/api/inquiries");
        const data = await response.json();
        setInquiries(data.inquiries);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };
    fetchInquiries();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/office/inbox/${id}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Inbox
        </Typography>

        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Job</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiries.map((inquiry, index) => (
                  <TableRow
                    key={inquiry.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(inquiry.id)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{inquiry.name}</TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.address}</TableCell>
                    <TableCell>{inquiry.country}</TableCell>
                    <TableCell>{inquiry.company}</TableCell>
                    <TableCell>{inquiry.title}</TableCell>
                    <TableCell>{inquiry.job}</TableCell>
                    <TableCell>{inquiry.message}</TableCell>
                    <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default InboxPage;
