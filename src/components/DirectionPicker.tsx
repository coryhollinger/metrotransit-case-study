import { useNavigate, useParams, useSearchParams } from "react-router";
import PickerItem from "./PickerItem";
import useGetDirections from "../hooks/useGetDirections";
import ListWithLoadingSpinner from "./ListWithLoadingSpinner";
import { Typography } from "@mui/material";
import ErrorMessage from "./ErrorMessage";

const DirectionPicker = () => {
  const { routeId } = useParams();
  const [searchParams] = useSearchParams();
  const { isLoading, error, data } = useGetDirections(routeId || "");
  const navigate = useNavigate();
  const routeName = searchParams.get("route");

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <Typography variant="h3" component="div" sx={{ m: 5 }}>
            {routeName}: Choose a Direction
          </Typography>
          <ListWithLoadingSpinner isLoading={isLoading}>
            {data.map((direction) => (
              <PickerItem
                key={direction.direction_id}
                handleClick={() => {
                  navigate({
                    pathname: `/results/${routeId}/${direction.direction_id}`,
                    search: `?route=${routeName}&direction=${direction.direction_name}`,
                  });
                }}
                buttonText={direction.direction_name}
              />
            ))}
          </ListWithLoadingSpinner>
        </>
      )}
    </>
  );
};

export default DirectionPicker;
