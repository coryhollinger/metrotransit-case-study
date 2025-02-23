import { useNavigate } from "react-router";
import PickerItem from "./PickerItem";
import useGetRoutes from "../hooks/useGetRoutes";
import {
  Container,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinnerWrapper from "./LoadingSpinnerWrapper";
import { ROUTE_PICKER_FILTER_LABEL, ROUTE_PICKER_HEADER } from "../strings";

const RoutePicker = () => {
  const { isLoading, error, data } = useGetRoutes();
  const [routeFilter, setRouteFilter] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRouteFilter(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // If exaclty one route matches the filter and the user presses Enter, use that route
    if (event.key === "Enter") {
      const filteredRoutes = data.filter((route) =>
        route.route_label.toLowerCase().includes(routeFilter.toLowerCase())
      );

      if (filteredRoutes.length === 1) {
        navigate(`/${filteredRoutes[0].route_id}`);
      }
    }
  };

  return (
    <>
      <Typography variant="h3" component="div" sx={{ m: 5 }}>
        {ROUTE_PICKER_HEADER}
      </Typography>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <TextField
            fullWidth
            autoFocus
            value={routeFilter}
            onChange={handleFilterChange}
            onKeyUp={handleKeyPress}
            label={ROUTE_PICKER_FILTER_LABEL}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Container data-testid="route-picker">
            <LoadingSpinnerWrapper isLoading={isLoading}>
              <List className="displayList">
                {data
                  .filter((route) =>
                    route.route_label
                      .toLowerCase()
                      .includes(routeFilter.toLowerCase())
                  )
                  .map((route) => (
                    <PickerItem
                      key={route.route_id}
                      handleClick={() => {
                        navigate({
                          pathname: `/search/${route.route_id}`,
                          search: `?route=${route.route_label}`,
                        });
                      }}
                      buttonText={route.route_label}
                    />
                  ))}
              </List>
            </LoadingSpinnerWrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default RoutePicker;
