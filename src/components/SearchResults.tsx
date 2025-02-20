import { useParams, useSearchParams } from "react-router";
import { ListItem, ListItemText, Typography } from "@mui/material";
import useGetStops from "../hooks/useGetStops";
import ListWithLoadingSpinner from "./ListWithLoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const SearchResults = () => {
  const { routeId, direction } = useParams();
  const { isLoading, error, data } = useGetStops(
    routeId || "",
    direction || ""
  );
  const [searchParams] = useSearchParams();
  const routeName = searchParams.get("route");
  const directionName = searchParams.get("direction");

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <Typography variant="h3" component="div" sx={{ m: 5 }}>
            {routeName} {directionName} Stops
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
