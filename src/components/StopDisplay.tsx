import { useParams, useSearchParams } from "react-router";
import { List, Typography } from "@mui/material";
import useGetStops from "../hooks/useGetStops";
import LoadingSpinnerWrapper from "./LoadingSpinnerWrapper";
import { SEARCH_RESULTS_HEADER } from "../strings";
import StopResult from "./StopResult";
import { Suspense } from "react";

const SearchResults = () => {
  const { routeId, direction } = useParams();
  const { isLoading, data } = useGetStops(routeId || "", direction || "");
  const [searchParams] = useSearchParams();
  const routeName = searchParams.get("route");
  const directionName = searchParams.get("direction");

  return (
    <LoadingSpinnerWrapper isLoading={isLoading}>
      <Typography variant="h3" component="div" sx={{ m: 5 }}>
        {routeName && `${routeName} `}
        {directionName && `${directionName} `}
        {SEARCH_RESULTS_HEADER}
      </Typography>

      <Suspense fallback={<LoadingSpinnerWrapper isLoading={true} />}>
        <List className="displayList">
          {data.map((stop, index) => (
            <StopResult
              routeId={routeId || ""}
              directionId={direction || ""}
              stop={stop}
              key={`${stop.place_code}-${routeId}-${direction}-${index}`}
            />
          ))}
        </List>
      </Suspense>
    </LoadingSpinnerWrapper>
  );
};

export default SearchResults;
