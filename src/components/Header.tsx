import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import logo from "../assets/metrotransit-logo.png";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { HEADER_TITLE } from "../strings";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <AppBar position="static" data-testid="header">
        <Toolbar sx={{ background: "#1976d2" }}>
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
            variant="h5"
            noWrap
            component="div"
          >
            {HEADER_TITLE}
          </Typography>
          {pathname !== "/" && (
            <Button variant="contained" onClick={() => navigate("/")}>
              <RestartAltIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
