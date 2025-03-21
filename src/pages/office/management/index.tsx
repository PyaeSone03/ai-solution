import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

const ManagementPage = () => {
  const router = useRouter();

  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      email: string;
      role: { id: string; name: string };
    }[]
  >([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [noPermission, setNoPermission] = useState(false);

  useEffect(() => {
    const storedRoleId = localStorage.getItem("roleID");
    if (storedRoleId !== "admin") {
      setNoPermission(true);
      setTimeout(() => {
        router.push("/office");
      }, 3000);
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles");
        const data = await response.json();
        setRoles(data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchRoles();
    fetchUsers();
  }, [isAdmin]);

  if (noPermission) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          You don't have permission to access that page.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Redirecting to the office page...
        </Typography>
      </Container>
    );
  }

  if (!isAdmin) return null;

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role.name === "admin").length;
  const totalStaff = users.filter((user) => user.role.name === "staff").length;

  const handleOpenDialog = (user?: any) => {
    if (user) {
      setEditMode(true);
      setSelectedUserId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRoleId(user.role.id);
      setPassword("");
    } else {
      setEditMode(false);
      setSelectedUserId(null);
      setName("");
      setEmail("");
      setPassword("");
      setRoleId("");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveUser = async () => {
    if (!name || !email || !roleId) {
      alert("All fields are required");
      return;
    }

    const url = editMode ? `/api/users/update` : `/api/users/create`;
    const method = editMode ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedUserId,
        name,
        email,
        password,
        roleId,
      }),
    });

    if (response.ok) {
      alert(
        editMode ? "User updated successfully" : "User created successfully"
      );
      setDialogOpen(false);
      window.location.reload();
    } else {
      const data = await response.json();
      alert(data.error || "Something went wrong");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const response = await fetch(`/api/users/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("User deleted successfully");
      setUsers(users.filter((user) => user.id !== id));
    } else {
      alert("Error deleting user");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h5" sx={{ my: 3 }}>
        User Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Total Users</Typography>
            <Typography variant="h6">{totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Total Admins</Typography>
            <Typography variant="h6">{totalAdmins}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Total Staff</Typography>
            <Typography variant="h6">{totalStaff}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Create Account
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for create/update */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editMode ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1976d2",
              },
              input: {
                color: "#333",
              },
            }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1976d2",
              },
              input: {
                color: "#333",
              },
            }}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            type="password"
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1976d2",
              },
              input: {
                color: "#333",
              },
            }}
          />
          <TextField
            label="Role"
            select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1976d2",
              },
              input: {
                color: "#333",
              },
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManagementPage;
