import { render, screen } from "@testing-library/react";
import { MockedFunction } from "vitest";
import SearchResults from "../SearchResults";
import useGetStops from "../../hooks/useGetStops";
import AppContext from "../../contexts/AppContext";

vi.mock("../../hooks/useGetStops");

const mockedUseGetStops = useGetStops as MockedFunction<typeof useGetStops>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("SearchResults Component", () => {
  it("should render without crashing", () => {
    mockedUseGetStops.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    render(<SearchResults />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should display the results", () => {
    mockedUseGetStops.mockReturnValue({
      data: [{ description: "Stop 1", place_code: "1" }],
      isLoading: false,
      error: null,
    });
    render(<SearchResults />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("should show a loading spinner when isLoading is true", () => {
    mockedUseGetStops.mockReturnValue({
      data: [{ description: "Stop 1", place_code: "1" }],
      isLoading: true,
      error: null,
    });
    render(<SearchResults />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("correctly displays from app state", () => {
    mockedUseGetStops.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ description: "Stop 1", place_code: "1" }],
    });
    const mockSetAppState = vi.fn();

    const baseState = {
      appState: { routeName: "Route 1", directionName: "North" },
      setAppState: mockSetAppState,
    };
    render(
      <AppContext.Provider value={baseState}>
        <SearchResults />
      </AppContext.Provider>
    );
    expect(screen.getByText("Route 1 North Stops")).toBeInTheDocument();
  });
});
