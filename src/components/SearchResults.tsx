import { useParams } from "react-router";
import { ListItem, ListItemText, Typography } from "@mui/material";
import useGetStops from "../hooks/useGetStops";
import ListWithLoadingSpinner from "./ListWithLoadingSpinner";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import ErrorMessage from "./ErrorMessage";

const SearchResults = () => {
  const { routeId, direction } = useParams();
  const { appState, setAppState } = useContext(AppContext);
  const { isLoading, error, data } = useGetStops(
    routeId || "",
    direction || ""
  );

  // Load route and direction names from sessionstorage if page is refreshed
  useEffect(() => {
    if (!appState.routeName || !appState.directionName) {
      setAppState({
        routeName: sessionStorage.getItem(`routeName-${routeId}`) || "",
        directionName:
          sessionStorage.getItem(`directionName-${routeId}-${direction}`) || "",
      });
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <Typography variant="h3" component="div" sx={{ m: 5 }}>
            {appState.routeName} {appState.directionName} Stops
          </Typography>
          <ListWithLoadingSpinner isLoading={isLoading}>
            {data.map((stop, index) => (
              <ListItem
                key={`${stop.place_code}-${index}`}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={stop.description} />
              </ListItem>
            ))}
          </ListWithLoadingSpinner>
        </>
      )}
    </>
  );
};

export default SearchResults;
