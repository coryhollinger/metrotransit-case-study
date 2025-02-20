import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router";
import { MockedFunction } from "vitest";
import DirectionPicker from "../DirectionPicker";
import useGetDirections from "../../hooks/useGetDirections";
import { renderWithMemoryRouter } from "../../../testUtils";

vi.mock("../../hooks/useGetDirections");

const mockedUseNavigate = vi.fn();

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => mockedUseNavigate,
}));

const mockUseGetDirections = useGetDirections as MockedFunction<
  typeof useGetDirections
>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("DirectionPicker", () => {
  it("displays loading spinner when loading", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: true,
      error: null,
      data: [],
    });
    renderWithMemoryRouter(<DirectionPicker />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: "Error",
      data: [],
    });
    renderWithMemoryRouter(<DirectionPicker />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("displays directions when data is available", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ direction_id: 1, direction_name: "North" }],
    });
    renderWithMemoryRouter(
      <Routes>
        <Route path="/:routeId" element={<DirectionPicker />} />
      </Routes>,
      { initialEntries: ["/1"] }
    );
    expect(mockUseGetDirections).toHaveBeenCalledWith("1");
    expect(screen.getByText("North")).toBeInTheDocument();
  });

  it("correctly displays from search params", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ direction_id: 1, direction_name: "North" }],
    });
    renderWithMemoryRouter(<DirectionPicker />, {
      initialEntries: ["/1?route=Route 1"],
    });
    expect(screen.getByText("Route 1: Choose a Direction")).toBeInTheDocument();
  });

  it("correctly updates search params and navigates when clicked", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ direction_id: 1, direction_name: "North" }],
    });

    renderWithMemoryRouter(
      <Routes>
        <Route path="/:routeId" element={<DirectionPicker />} />
      </Routes>,
      { initialEntries: ["/1?route=Route 1"] }
    );
    const button = screen.getByRole("button");
    button.click();
    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/results/1/1",
      search: "?route=Route 1&direction=North",
    });
  });
});
