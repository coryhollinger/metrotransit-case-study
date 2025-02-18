import { renderHook, waitFor } from "@testing-library/react";
import useGetDirections from "../useGetDirections";
import { getDirections } from "../../services/metroTransitService";
import { MockedFunction } from "vitest";
import { DirectionResponse } from "../../models";

const mockedGetDirections = getDirections as MockedFunction<
  typeof getDirections
>;

vi.mock("../../services/metroTransitService", () => ({
  getDirections: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useGetDirections", () => {
  it("calls useFetch with correct params", () => {
    const mockData = [{ direction_id: 1, direction_name: "North" }];
    mockedGetDirections.mockReturnValue(
      new Promise<DirectionResponse[]>((resolve) => {
        resolve(mockData);
      })
    );

    const routeId = "1";
    const { result } = renderHook(() => useGetDirections(routeId));

    expect(result.current.isLoading).toBe(true);

    waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(mockedGetDirections).toHaveBeenCalledWith(routeId);
    });
  });
});
