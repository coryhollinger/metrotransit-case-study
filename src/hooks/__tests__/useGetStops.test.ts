import { renderHook, waitFor } from "@testing-library/react";
import { getStops } from "../../services/metroTransitService";
import { MockedFunction } from "vitest";
import { StopResponse } from "../../models";
import useGetStops from "../useGetStops";

const mockedGetStops = getStops as MockedFunction<typeof getStops>;

vi.mock("../../services/metroTransitService", () => ({
  getStops: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useGetStops", async () => {
  it("calls useFetch with correct params", async () => {
    const mockData = [{ place_code: "1", description: "Main St" }];
    mockedGetStops.mockReturnValue(
      new Promise<StopResponse[]>((resolve) => {
        resolve(mockData);
      })
    );

    const routeId = "1";
    const directionId = "1";
    const { result } = renderHook(() => useGetStops(routeId, directionId));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(mockedGetStops).toHaveBeenCalledWith(routeId, directionId);
    });
  });
});
