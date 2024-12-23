import MUIResponsiveAppBar from "../components/mui_appbar";
import { Box, Button, Typography, Paper } from "@mui/material";
import bgimg from "../resources/bg-img-2.jpg";
import { useNavigate } from "react-router";

const HomeScreen = () => {
  const navigate = useNavigate();

  function handleClick(name) {
    navigate(name);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: "bold" }}>
          Guitar Manager
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleClick("/add-guitar")}
            >
              Add Guitar
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleClick("/add-maintenance")}
            >
              Add Maintenance
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleClick("/view-guitars")}
            >
              View Guitars
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleClick("/view-maintenances")}
            >
              View Maintenances
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomeScreen;
