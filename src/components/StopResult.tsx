import { ListItem, ListItemText } from "@mui/material";
import { StopResponse } from "../models";
import useGetNextDeparture from "../hooks/useGetNextDeparture";

const StopResult = ({
  routeId,
  directionId,
  stop,
}: {
  routeId: string;
  directionId: string;
  stop: StopResponse;
}) => {
  const { place_code, description } = stop;
  const { isLoading, error, data } = useGetNextDeparture(
    routeId,
    directionId,
    place_code
  );

  const { departures } = data;

  return (
    <ListItem sx={{ textAlign: "center" }}>
      <ListItemText
        primary={description}
        secondary={
          error
            ? "Could not determine next departure"
            : departures.length > 0
            ? `Next Departure: ${departures[0].departure_text}`
            : "No departures at this time"
        }
        slotProps={{
          secondary: isLoading ? { sx: { filter: "blur(2px)" } } : {},
        }}
      />
    </ListItem>
  );
};

export default StopResult;
