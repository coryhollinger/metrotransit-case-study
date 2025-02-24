import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../useFetch";
import { RouteResponse } from "../../models";
import { resetCache } from "../../services/metroTransitService";
import { MockedFunction } from "vitest";

vi.mock("axios-cache-interceptor", () => ({
  setupCache: vi.fn().mockReturnValue({
    get: vi.fn(),
    storage: {
      clear: vi.fn(),
    },
  }),
}));

vi.mock("../../services/metroTransitService", () => ({
  resetCache: vi.fn(),
}));

const mockedResetCache = resetCache as MockedFunction<typeof resetCache>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useFetch", () => {
  it("should return data when fetch is successful", async () => {
    const mockData = [{ route_label: "Route 1", route_id: "1" }];
    const mockFunc = (): Promise<RouteResponse[]> => {
      return new Promise((resolve) => resolve(mockData));
    };

    const { result } = renderHook(() => useFetch(mockFunc, []));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.error).toBeFalsy();
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should clear cache when error", async () => {
    const mockFunc = vi.fn(
      (): Promise<RouteResponse[]> =>
        new Promise(() => {
          throw new Error("Fetch failed");
        })
    );
    const { result } = renderHook(() => useFetch(mockFunc, []));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
      expect(result.current.isLoading).toBe(false);
      expect(mockedResetCache).toHaveBeenCalled();
    });
  });
});
