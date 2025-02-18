import { PropsWithChildren } from "react";
import { List, Fade, CircularProgress } from "@mui/material";

const ListWithLoadingSpinner = ({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading: boolean }>) => {
  return (
    <>
      <List sx={{ overflow: "scroll", maxHeight: "80vh" }}>
        {isLoading ? (
          <Fade
            in={isLoading}
            style={{
              transitionDelay: isLoading ? "500ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        ) : (
          children
        )}
      </List>
    </>
  );
};

export default ListWithLoadingSpinner;
