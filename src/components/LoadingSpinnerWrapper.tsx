import { PropsWithChildren } from "react";
import { Fade, CircularProgress } from "@mui/material";

const LoadingSpinnerWrapper = ({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading: boolean }>) => {
  return (
    <>
      {isLoading ? (
        <Fade
          in={isLoading}
          style={{
            transitionDelay: isLoading ? "500ms" : "0ms",
          }}
        >
          <CircularProgress sx={{ m: 3 }} />
        </Fade>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinnerWrapper;
