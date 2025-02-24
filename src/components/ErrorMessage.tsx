import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorMessage = ({ error }: { error: Error }) => {
  return (
    <Box
      sx={{ textAlign: "center", padding: "20px" }}
      data-testid="error-message"
    >
      <Typography variant="h4">
        <ErrorOutlineIcon fontSize="large" sx={{ mr: 1 }} />
        {error
          ? error.message
          : "Oops! Something went wrong. Please try again."}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
