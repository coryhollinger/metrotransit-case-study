import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../useFetch";
import { RouteResponse } from "../../models";
import { metroTransitAxios } from "../../services/metroTransitService";
import { MockedObject } from "vitest";

vi.mock("axios-cache-interceptor", () => ({
  setupCache: vi.fn().mockReturnValue({
    get: vi.fn(),
    storage: {
      clear: vi.fn(),
    },
  }),
}));

const mockedMetroTransitAxios = metroTransitAxios as MockedObject<
  typeof metroTransitAxios
>;

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
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isError).toBe(false);
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
      expect(result.current.isError).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(mockedMetroTransitAxios.storage.clear).toHaveBeenCalled();
    });
  });
});
