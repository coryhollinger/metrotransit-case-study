import { useNavigate, useParams, useSearchParams } from "react-router";
import PickerItem from "./PickerItem";
import useGetDirections from "../hooks/useGetDirections";
import { List, Typography } from "@mui/material";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinnerWrapper from "./LoadingSpinnerWrapper";
import { DIRECTION_PICKER_HEADER } from "../strings";

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
          <LoadingSpinnerWrapper isLoading={isLoading}>
            <Typography variant="h3" component="div" sx={{ m: 5 }}>
              {`${routeName ? `${routeName}: ` : ""}${DIRECTION_PICKER_HEADER}`}
            </Typography>
            <List className="displayList">
              {data.map((direction) => (
                <PickerItem
                  key={direction.direction_id}
                  handleClick={() => {
                    navigate({
                      pathname: `/search/${routeId}/${direction.direction_id}`,
                      search: `?route=${routeName}&direction=${direction.direction_name}`,
                    });
                  }}
                  buttonText={direction.direction_name}
                />
              ))}
            </List>
          </LoadingSpinnerWrapper>
        </>
      )}
    </>
  );
};

export default DirectionPicker;
