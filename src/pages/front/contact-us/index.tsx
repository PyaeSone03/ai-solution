import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    company: "",
    title: "",
    job: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    address: false,
    country: false,
    company: false,
    title: false,
    job: false,
    message: false,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      address: !formData.address.trim(),
      country: !formData.country.trim(),
      company: !formData.company.trim(),
      title: !formData.title.trim(),
      job: !formData.job.trim(),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((error) => error);

    if (!hasError) {
      try {
        const response = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSnackbar({ open: true, message: "Form submitted successfully!", severity: "success" });
          setFormData({ name: "", email: "", address: "", country: "", company: "", title: "", job: "", message: "" });
        } else if (response.status === 409) {
          setSnackbar({ open: true, message: "Email already exists!", severity: "error" });
        } else {
          setSnackbar({ open: true, message: "Submission failed!", severity: "error" });
        }
      } catch (error) {
        setSnackbar({ open: true, message: "An error occurred!", severity: "error" });
      }
    }
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "white" }}>
      <Box textAlign="center" padding={{ xs: "20px", md: "40px" }}>
        <Typography variant="h3" fontWeight="bold">Get in Touch with Us</Typography>
      </Box>

      <Box component="form" sx={{ maxWidth: "800px", margin: "0 auto", padding: "40px", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", borderRadius: "12px" }}>
        <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} error={errors.name} helperText={errors.name ? "Name is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} helperText={errors.email ? "Valid email is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="address" label="Address" value={formData.address} onChange={handleChange} error={errors.address} helperText={errors.address ? "Address is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="country" label="Country" value={formData.country} onChange={handleChange} error={errors.country} helperText={errors.country ? "Country is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="company" label="Company" value={formData.company} onChange={handleChange} error={errors.company} helperText={errors.company ? "Company is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="title" label="Title" value={formData.title} onChange={handleChange} error={errors.title} helperText={errors.title ? "Title is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="job" label="Job Role" value={formData.job} onChange={handleChange} error={errors.job} helperText={errors.job ? "Job role is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />
        <TextField name="message" label="Message" multiline rows={4} value={formData.message} onChange={handleChange} error={errors.message} helperText={errors.message ? "Message is required" : ""} fullWidth variant="filled" sx={{ mb: 2 }} />

        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ padding: "10px 40px", fontSize: "1rem" }}>
            Submit Inquiry
          </Button>
        </Box>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity as "success" | "error"}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Index;
