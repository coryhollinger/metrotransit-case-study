import {
  ListItem,
  listItemSecondaryActionClasses,
  ListItemText,
} from "@mui/material";
import { StopResponse } from "../models";
import useGetNextDeparture from "../hooks/useGetNextDeparture";
import {
  NEXT_DEPARTURE_LABEL,
  NEXT_DEPARTURE_ERROR_TEXT,
  NEXT_DEPARTURE_NONE_FOUND,
} from "../strings";

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
  const { isLoading, isError, data } = useGetNextDeparture(
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
          isError
            ? NEXT_DEPARTURE_ERROR_TEXT
            : departures.length > 0
            ? `${NEXT_DEPARTURE_LABEL}: ${new Date(
                departures[0].departure_time * 1000
              ).toLocaleTimeString()}`
            : NEXT_DEPARTURE_NONE_FOUND
        }
        slotProps={{
          secondary: isLoading ? { sx: { filter: "blur(3px)" } } : {},
        }}
      />
    </ListItem>
  );
};

export default StopResult;
