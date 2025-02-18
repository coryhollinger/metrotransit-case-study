import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { MockedFunction } from "vitest";
import AppContext from "../../contexts/AppContext";
import DirectionPicker from "../DirectionPicker";
import useGetDirections from "../../hooks/useGetDirections";

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
    render(
      <MemoryRouter>
        <DirectionPicker />
      </MemoryRouter>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: "Error",
      data: [],
    });
    render(
      <MemoryRouter>
        <DirectionPicker />
      </MemoryRouter>
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("displays directions when data is available", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ direction_id: 1, direction_name: "North" }],
    });
    render(
      <MemoryRouter initialEntries={["/1"]}>
        <Routes>
          <Route path="/:routeId" element={<DirectionPicker />} />
        </Routes>
      </MemoryRouter>
    );
    expect(mockUseGetDirections).toHaveBeenCalledWith("1");
    expect(screen.getByText("North")).toBeInTheDocument();
  });

  it("correctly displays from app state", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ direction_id: 1, direction_name: "North" }],
    });
    render(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            appState: { routeName: "Route 1", directionName: "" },
            setAppState: vi.fn(),
          }}
        >
          <DirectionPicker />
        </AppContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Route 1: Choose a Direction")).toBeInTheDocument();
  });

  it("correctly updates app state and nvaigates when clicked", () => {
    mockUseGetDirections.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ direction_id: 1, direction_name: "North" }],
    });
    const mockSetAppState = vi.fn();

    const baseState = {
      appState: { routeName: "Route 1", directionName: "" },
      setAppState: mockSetAppState,
    };

    render(
      <MemoryRouter initialEntries={["/1"]}>
        <AppContext.Provider value={baseState}>
          <Routes>
            <Route path="/:routeId" element={<DirectionPicker />} />
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(mockSetAppState).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/results/1/1");
  });
});
