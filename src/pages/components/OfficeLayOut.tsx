import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Image from "next/image";

interface IOfficeLayOutProps {
  children?: React.ReactNode;
}

const OfficeLayOut: React.FC<IOfficeLayOutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const pages = [
    { name: "Dashboard", path: "/office/" },
    { name: "Inbox", path: "/office/inbox/" },
    { name: "Management", path: "/office/management" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("userName"); // Remove token from local storage
    localStorage.removeItem("roleID"); // Remove token from local storage
    router.push("/"); // Redirect to home page after logout
    setOpenMenu(false);
  };

  const toggleDrawer = (open: boolean) => {
    setOpenMenu(open);
  };

  return (
    <Box>
      {/* ✅ Modern Frosted Glass AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: "blur(10px)", // ✅ Glass effect
          backgroundColor: "rgba(0, 0, 0, 0.61)", // ✅ Transparent
          borderRadius: "20px",
          margin: "20px auto",
          width: "95%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
            }}
          >
            {/* ✅ Fixed Image Import */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/Icon.png"
                alt="Client Feedback"
                width={40}
                height={40}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  color: theme.palette.secondary.main,
                  cursor: "pointer",
                }}
              >
                AI Solution
              </Typography>
            </Box>

            {/* ✅ Mobile Menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* ✅ Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 3,
              }}
            >
              {pages.map((page) => (
                <Typography
                  key={page.name}
                  sx={{
                    cursor: "pointer",
                    color:
                      router.pathname === page.path
                        ? theme.palette.secondary.main
                        : theme.palette.text.primary,
                    borderBottom:
                      router.pathname === page.path
                        ? `2px solid ${theme.palette.secondary.main}`
                        : "none",
                    transition: "color 0.3s ease, border-bottom 0.3s ease",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                  onClick={() => router.push(page.path)}
                >
                  {page.name}
                </Typography>
              ))}

              {/* ✅ Logout Button */}
              <Button
                sx={{
                  textAlign: "left",
                  color: theme.palette.primary.contrastText,
                  padding: "10px 20px",
                  bgcolor: theme.palette.primary.main,
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ✅ Mobile Drawer */}
      <Drawer anchor="left" open={openMenu} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
          }}
        >
          {pages.map((page) => (
            <Typography
              key={page.name}
              sx={{
                padding: "10px 20px",
                cursor: "pointer",
                color:
                  router.pathname === page.path
                    ? theme.palette.secondary.main
                    : theme.palette.text.primary,
                borderBottom:
                  router.pathname === page.path
                    ? `1px solid ${theme.palette.secondary.main}`
                    : "none",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
              onClick={() => {
                router.push(page.path);
                toggleDrawer(false);
              }}
            >
              {page.name}
            </Typography>
          ))}

          <Button
            sx={{
              textAlign: "left",
              color: theme.palette.primary.contrastText,
              padding: "10px 20px",
              bgcolor: theme.palette.primary.main,
              "&:hover": { bgcolor: theme.palette.primary.dark },
            }}
            onClick={() => {
              router.push("/login");
              toggleDrawer(false);
            }}
          >
            Login
          </Button>
        </Box>
      </Drawer>

      {/* ✅ Main Content */}
      <Box
        sx={{
          
          maxHeight: "auto",
          margin: "0 auto",
          padding: 0,
        }}
      >
        {children}
      </Box>

      {/* ✅ Footer */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: { xs: "20px", md: "40px" },
          borderTop: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} AI Solution. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default OfficeLayOut;
