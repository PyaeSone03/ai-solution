import { createTheme } from "@mui/material/styles";

// Extend the MUI theme with the custom 'border' property
declare module "@mui/material/styles" {
  interface Palette {
    border: {
      main: string;
    };
  }
  interface PaletteOptions {
    border?: {
      main: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF", // White background for AppBar
    },
    secondary: {
      main: "#000000", // Black text for buttons
    },
    border: {
      main: "#E5E5E5", // Border color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h6: {
      fontWeight: 500,
      fontSize: "28px",
      lineHeight: "36px",
    },
    button: {
      fontSize: "16px",
      lineHeight: "24px",
      textTransform: "none",
    },
  },
});

export default theme;
