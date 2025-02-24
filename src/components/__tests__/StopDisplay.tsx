import { screen } from "@testing-library/react";
import { MockedFunction } from "vitest";
import SearchResults from "../StopDisplay";
import useGetStops from "../../hooks/useGetStops";
import { renderWithMemoryRouter } from "../../../testUtils";

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
    });
    renderWithMemoryRouter(<SearchResults />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should display the results", () => {
    mockedUseGetStops.mockReturnValue({
      data: [{ description: "Stop 1", place_code: "1" }],
      isLoading: false,
    });
    renderWithMemoryRouter(<SearchResults />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("should show a loading spinner when isLoading is true", () => {
    mockedUseGetStops.mockReturnValue({
      data: [{ description: "Stop 1", place_code: "1" }],
      isLoading: true,
    });
    renderWithMemoryRouter(<SearchResults />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("correctly displays from search params", () => {
    mockedUseGetStops.mockReturnValue({
      isLoading: false,
      data: [{ description: "Stop 1", place_code: "1" }],
    });

    renderWithMemoryRouter(<SearchResults />, {
      initialEntries: ["/1?route=Route 1&direction=North"],
    });
    expect(screen.getByText("Route 1 North Stops")).toBeInTheDocument();
  });
});
