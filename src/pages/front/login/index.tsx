import { Box, TextField, Button, Typography } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/images/bg.jpg') no-repeat center/cover",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "400px" },
          padding: "30px",
          borderRadius: "12px",
          background: "rgba(136, 0, 0, 0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          display: "flex",
          
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={2} color="white">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="white" mb={3}>
            Please sign in to your account
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="filled"
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              "& .MuiInputBase-root": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              "& .MuiInputBase-root": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            }}
          >
            Sign In
          </Button>
        </Box>
        <Box>
          asdas
        </Box>
      </Box>
    </Box>
  );
};

export default index;
