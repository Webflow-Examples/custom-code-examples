import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        marginBottom: "30px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Webflow Custom Code Examples
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
