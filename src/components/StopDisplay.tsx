import { useParams, useSearchParams } from "react-router";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import useGetStops from "../hooks/useGetStops";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinnerWrapper from "./LoadingSpinnerWrapper";
import { SEARCH_RESULTS_HEADER } from "../strings";

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
          <LoadingSpinnerWrapper isLoading={isLoading}>
            <Typography variant="h3" component="div" sx={{ m: 5 }}>
              {routeName && `${routeName} `}
              {directionName && `${directionName} `}
              {SEARCH_RESULTS_HEADER}
            </Typography>
            <List className="displayList">
              {data.map((stop, index) => (
                <ListItem
                  key={`${stop.place_code}-${index}`}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={stop.description} />
                </ListItem>
              ))}
            </List>
          </LoadingSpinnerWrapper>
        </>
      )}
    </>
  );
};

export default SearchResults;
