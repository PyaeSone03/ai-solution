import { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const InboxPage = () => {
  const [inquiries, setInquiries] = useState<{ id: string; name: string; email: string; address: string; country: string; company: string; title: string; job: string; message: string; createdAt: string }[]>([]);

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

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
        Inbox
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
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
              <TableRow key={inquiry.id}>
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
    </Container>
  );
};

export default InboxPage;
