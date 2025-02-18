import { useNavigate, useParams } from "react-router";
import PickerItem from "./PickerItem";
import useGetDirections from "../hooks/useGetDirections";
import ListWithLoadingSpinner from "./ListWithLoadingSpinner";
import { Typography } from "@mui/material";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import ErrorMessage from "./ErrorMessage";

const DirectionPicker = () => {
  const { routeId } = useParams();
  const { appState, setAppState } = useContext(AppContext);
  const { isLoading, error, data } = useGetDirections(routeId || "");
  const navigate = useNavigate();

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <Typography variant="h3" component="div" sx={{ m: 5 }}>
            {appState.routeName}: Choose a Direction
          </Typography>
          <ListWithLoadingSpinner isLoading={isLoading}>
            {data.map((direction) => (
              <PickerItem
                key={direction.direction_id}
                handleClick={() => {
                  setAppState((prevState) => {
                    return {
                      ...prevState,
                      directionName: direction.direction_name,
                    };
                  });
                  navigate(`/results/${routeId}/${direction.direction_id}`);
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
