import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import StopResult from "../StopResult";
import useGetNextDeparture from "../../hooks/useGetNextDeparture";

vi.mock("../../hooks/useGetNextDeparture");

const mockedUseGetNextDeparture = useGetNextDeparture as MockedFunction<
  typeof useGetNextDeparture
>;

describe("StopResult", () => {
  const mockStop = {
    place_code: "123",
    description: "Test Stop",
  };

  it("displays loading state", () => {
    mockedUseGetNextDeparture.mockReturnValue({
      isLoading: true,
      error: undefined,
      data: { departures: [] },
    });

    render(<StopResult routeId="1" directionId="1" stop={mockStop} />);
    expect(screen.getByText("Test Stop")).toBeInTheDocument();
    expect(screen.getByText("No departures at this time")).toHaveStyle(
      "filter: blur(2px)"
    );
  });

  it("displays error state", async () => {
    mockedUseGetNextDeparture.mockReturnValue({
      isLoading: false,
      error: new Error("Oh no"),
      data: { departures: [] },
    });

    render(<StopResult routeId="1" directionId="1" stop={mockStop} />);
    expect(screen.getByText("Test Stop")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText("Could not determine next departure")
      ).toBeInTheDocument();
    });
  });

  it("displays next departure", async () => {
    mockedUseGetNextDeparture.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        departures: [{ departure_text: "10:00 AM", departure_time: 123211424 }],
      },
    });

    render(<StopResult routeId="1" directionId="1" stop={mockStop} />);
    expect(screen.getByText("Test Stop")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Next Departure: 10:00 AM")).toBeInTheDocument();
    });
  });
});
