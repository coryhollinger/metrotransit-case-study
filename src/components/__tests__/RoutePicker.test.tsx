import { render, screen } from "@testing-library/react";
import RoutePicker from "../RoutePicker";
import useGetRoutes from "../../hooks/useGetRoutes";
import { MockedFunction } from "vitest";
import { MemoryRouter } from "react-router";
import AppContext from "../../contexts/AppContext";

const mockedUseNavigate = vi.fn();

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => mockedUseNavigate,
}));
vi.mock("../../hooks/useGetRoutes");

const mockUseGetRoutes = useGetRoutes as MockedFunction<typeof useGetRoutes>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("RoutePicker Component", () => {
  it("should render without crashing", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: false,
      error: null,
    });
    render(
      <MemoryRouter>
        <RoutePicker />
      </MemoryRouter>
    );
    expect(screen.getByTestId("route-picker")).toBeInTheDocument();
  });

  it("should display the loading spinner when still loading", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: true,
      error: null,
    });
    render(
      <MemoryRouter>
        <RoutePicker />
      </MemoryRouter>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display the route when loading is done", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: false,
      error: null,
    });
    render(
      <MemoryRouter>
        <RoutePicker />
      </MemoryRouter>
    );
    expect(screen.getByText("Route 1")).toBeInTheDocument();
  });

  it("should display an error when present", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: false,
      error: "Whoops! Something went wrong.",
    });
    render(
      <MemoryRouter>
        <RoutePicker />
      </MemoryRouter>
    );
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("should update state and change route when a bus route is clicked", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: false,
      error: null,
    });

    const mockedSetAppState = vi.fn();
    const baseSate = {
      appState: { routeName: "", directionName: "" },
      setAppState: mockedSetAppState,
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppContext.Provider value={baseSate}>
          <RoutePicker />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/1");
    expect(mockedSetAppState).toHaveBeenCalled();
  });
});
