import { useParams } from "react-router";
import { ListItem, ListItemText, Typography } from "@mui/material";
import useGetStops from "../hooks/useGetStops";
import ListWithLoadingSpinner from "./ListWithLoadingSpinner";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import ErrorMessage from "./ErrorMessage";

const SearchResults = () => {
  const { routeId, direction } = useParams();
  const { appState } = useContext(AppContext);
  const { isLoading, error, data } = useGetStops(
    routeId || "",
    direction || ""
  );

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
