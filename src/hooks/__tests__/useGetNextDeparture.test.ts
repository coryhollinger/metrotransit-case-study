import { renderHook, waitFor } from "@testing-library/react";
import { getNextDeparture } from "../../services/metroTransitService";
import { MockedFunction } from "vitest";
import { NexTripResponse } from "../../models";
import useGetNextDeparture from "../useGetNextDeparture";

const mockedGetNextDeparture = getNextDeparture as MockedFunction<
  typeof getNextDeparture
>;

vi.mock("../../services/metroTransitService", () => ({
  getNextDeparture: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useGetNextDeparture", () => {
  it("calls useFetch with correct params", async () => {
    const mockData: NexTripResponse = {
      departures: [
        {
          departure_time: 123435123,
          departure_text: "11:11",
        },
      ],
    };
    mockedGetNextDeparture.mockReturnValue(
      new Promise<NexTripResponse>((resolve) => {
        resolve(mockData);
      })
    );

    const routeId = "1";
    const directionId = "1";
    const stopId = "1";
    const { result } = renderHook(() =>
      useGetNextDeparture(routeId, directionId, stopId)
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(mockedGetNextDeparture).toHaveBeenCalledWith(
        routeId,
        directionId,
        stopId
      );
    });
  });
});
