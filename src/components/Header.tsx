import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import logo from "../assets/metrotransit-logo.png";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <AppBar position="static" data-testid="header">
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 50,
            }}
            alt="Metro Transit Logo"
            src={logo}
            onClick={() => navigate("/")}
          />
          <Typography
            sx={{ flexGrow: 1, textAlign: "center", overflow: "visible" }}
            variant="h6"
            noWrap
            component="div"
          >
            Metro Transit NexTrip
          </Typography>
          {pathname !== "/" && (
            <Button
              sx={{ display: { xs: "none", sm: "block" } }}
              variant="contained"
              onClick={() => navigate("/")}
            >
              <RestartAltIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
