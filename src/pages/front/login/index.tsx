import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField, Container, Paper, Typography, CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("🔹 Login Response:", result); // ✅ Debugging

      if (result?.error) {
        console.error("🚨 Login Error:", result.error);
        alert("Invalid email or password");
        return;
      }

      // Fetch user details from session
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();

      if (!sessionData?.user) {
        throw new Error("Session data is missing user details");
      }

      console.log("🟢 Session Data:", sessionData);

      // Ensure localStorage is available in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("token", sessionData?.jwt || ""); // JWT Token
        localStorage.setItem("userName", sessionData?.user?.name || "");
        localStorage.setItem("roleID", sessionData?.user?.role || "");
      }

      // Redirect user
      router.push("/office");
    } catch (error) {
      console.error("🚨 Error fetching session data:", error);
      alert("Error storing session details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleLogin} 
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
