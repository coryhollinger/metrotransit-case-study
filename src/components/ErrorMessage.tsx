import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ERROR_BOUNDARY_MESSAGE } from "../strings";

const ErrorMessage = ({ error }: { error: Error }) => {
  return (
    <Box
      sx={{ textAlign: "center", padding: "20px" }}
      data-testid="error-message"
    >
      <Typography variant="h4">
        <ErrorOutlineIcon fontSize="large" sx={{ mr: 1 }} />
        {error ? error.message : ERROR_BOUNDARY_MESSAGE}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
