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

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Software Solutions", path: "/front/software-solutions" },
    { name: "Industries Served", path: "/front/industries-served" },
    { name: "Customer Feedback", path: "/front/customer-feedback" },
    { name: "Blog/Articles", path: "/front/blog-articles" },
    { name: "Contact Us", path: "/front/contact-us" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenMenu(false);
  };

  const toggleDrawer = (open: boolean) => {
    setOpenMenu(open);
  };

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.primary.main,
          width: "100%",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.border.main}`,
          top: 0,
          zIndex: 1100,
          alignItems: "center",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 0,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: theme.typography.h6.fontWeight,
                fontSize: theme.typography.h6.fontSize,
                lineHeight: theme.typography.h6.lineHeight,
                textDecoration: "none",
                color: theme.palette.secondary.main,
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            >
              AI-Solution
            </Typography>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

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
                  onClick={() => handleNavigation(page.path)}
                >
                  {page.name}
                </Typography>
              ))}

              <Button
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "black",
                }}
                onClick={() => handleNavigation("/front/login")}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
              onClick={() => handleNavigation(page.path)}
            >
              {page.name}
            </Typography>
          ))}

          <Button
            sx={{
              textAlign: "left",
              color: theme.palette.secondary.main,
              padding: "10px 20px",
              bgcolor: "black",
            }}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ margin: "0 auto", padding: 0 }}>{children}</Box>

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

export default Layout;
