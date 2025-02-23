import { Typography } from "@mui/material";
import { NOT_FOUND_TEXT } from "../strings";

const NotFound = () => {
  return (
    <Typography variant="h2" sx={{ m: 5 }}>
      {NOT_FOUND_TEXT}
    </Typography>
  );
};

export default NotFound;
