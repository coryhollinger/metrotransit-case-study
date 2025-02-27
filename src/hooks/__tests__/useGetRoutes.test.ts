import { renderHook, waitFor } from "@testing-library/react";
import { getRoutes } from "../../services/metroTransitService";
import { MockedFunction } from "vitest";
import { RouteResponse } from "../../models";
import useGetRoutes from "../useGetRoutes";

const mockedGetRoutes = getRoutes as MockedFunction<typeof getRoutes>;

vi.mock("../../services/metroTransitService", () => ({
  getRoutes: vi.fn(),
  resetCache: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useGetRoutes", async () => {
  it("calls getRoutes correctly", async () => {
    const mockData = [{ route_label: "Route 1", route_id: "1" }];
    mockedGetRoutes.mockReturnValue(
      new Promise<RouteResponse[]>((resolve) => {
        resolve(mockData);
      })
    );

    const { result } = renderHook(() => useGetRoutes());
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(mockedGetRoutes).toHaveBeenCalled();
    });
  });
});
