import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import Layout from "./components/layOut";
import theme from "./components/theme";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Box>
    </ThemeProvider>
  );
};

export default App;
