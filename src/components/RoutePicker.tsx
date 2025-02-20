import { useNavigate } from "react-router";
import PickerItem from "./PickerItem";
import useGetRoutes from "../hooks/useGetRoutes";
import ListWithLoadingSpinner from "./ListWithLoadingSpinner";
import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AppContext from "../contexts/AppContext";
import ErrorMessage from "./ErrorMessage";

const RoutePicker = () => {
  const { isLoading, error, data } = useGetRoutes();
  const { setAppState } = useContext(AppContext);
  const [routeFilter, setRouteFilter] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRouteFilter(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
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
        Choose A Route
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
            label="Filter Routes"
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
            <ListWithLoadingSpinner isLoading={isLoading}>
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
                      setAppState((prevState) => {
                        return {
                          ...prevState,
                          routeName: route.route_label,
                        };
                      });
                      sessionStorage.setItem(
                        `routeName-${route.route_id}`,
                        route.route_label
                      );
                      navigate(`/${route.route_id}`);
                    }}
                    buttonText={route.route_label}
                  />
                ))}
            </ListWithLoadingSpinner>
          </Container>
        </>
      )}
    </>
  );
};

export default RoutePicker;
