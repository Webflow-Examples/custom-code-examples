import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/customTheme";
import { Box, Container } from "@mui/material";

// Components
import Header from "./components/Header";
import SiteSelector from "./components/SiteSelector";
import Footer from "./components/Footer";
import ExampleStepper from "./components/Examples/ExampleStepper";

function App() {
  const [selectedSite, setselectedSite] = useState(null);

  const handleSelectSite = (site) => {
    console.log("Site selected:", site);
    setselectedSite(site);
  };

  return (
    <ThemeProvider theme={theme}>
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
        <SiteSelector onSelectSite={handleSelectSite} />
        <Container sx={{ mt: 4, mb: 4, p: 2 }}>
          <ExampleStepper selectedSite={selectedSite} />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
