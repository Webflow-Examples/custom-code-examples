import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./utils/customTheme";
import { Box, Container, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Components
import Header from "./components/Header";
import SiteSelector from "./components/SiteSelector";
import Footer from "./components/Footer";
import ExampleStepper from "./components/Examples/ExampleStepper";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [selectedSite, setselectedSite] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const handleSelectSite = (site) => {
    console.log("Site selected:", site);
    setselectedSite(site);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "100w",
          width: "100vw",
        }}
      >
        <Header />
        <Box
          component="main"
          flexGrow={1}
          sx={{ bgcolor: "background.default" }}
        >
          <SiteSelector onSelectSite={handleSelectSite} />
          <Container sx={{ mt: 4, mb: 4, p: 2 }}>
            <ExampleStepper selectedSite={selectedSite} />
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
