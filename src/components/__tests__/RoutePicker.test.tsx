import { screen } from "@testing-library/react";
import RoutePicker from "../RoutePicker";
import useGetRoutes from "../../hooks/useGetRoutes";
import { MockedFunction } from "vitest";
import { renderWithMemoryRouter } from "../../../testUtils";

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
    });
    renderWithMemoryRouter(<RoutePicker />);
    expect(screen.getByTestId("route-picker")).toBeInTheDocument();
  });

  it("should display the loading spinner when still loading", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: true,
    });
    renderWithMemoryRouter(<RoutePicker />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display the route when loading is done", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: false,
    });
    renderWithMemoryRouter(<RoutePicker />);
    expect(screen.getByText("Route 1")).toBeInTheDocument();
  });

  it("should change route when a bus route is clicked", () => {
    mockUseGetRoutes.mockReturnValue({
      data: [{ route_label: "Route 1", route_id: "1" }],
      isLoading: false,
    });

    renderWithMemoryRouter(<RoutePicker />, { initialEntries: ["/"] });
    const button = screen.getByRole("button");
    button.click();
    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/search/1",
      search: "?route=Route 1",
    });
  });
});
