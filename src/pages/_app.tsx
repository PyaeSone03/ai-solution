import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import theme from "./components/theme";
import "../styles/globals.css";
import AppLayout from "./components/AppLayOut";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppLayout>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </AppLayout>
      </Box>
    </ThemeProvider>
  );
};

export default App;