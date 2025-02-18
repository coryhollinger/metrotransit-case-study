import { MockedObject, vi } from "vitest";
import {
  getRoutes,
  getDirections,
  getStops,
  metroTransitAxios,
} from "../metroTransitService";
import { RouteResponse, DirectionResponse, StopResponse } from "../../models";

vi.mock("axios-cache-interceptor", () => ({
  setupCache: vi.fn().mockReturnValue({
    get: vi.fn(),
  }),
}));

const mockedMetroTransitAxios = metroTransitAxios as MockedObject<
  typeof metroTransitAxios
>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("metroTransitService", () => {
  describe("getRoutes", () => {
    it("should fetch routes successfully", async () => {
      const mockData: RouteResponse[] = [
        { route_id: "1", route_label: "Route 1" },
      ];
      mockedMetroTransitAxios.get.mockResolvedValue({
        status: 200,
        data: mockData,
        cached: false,
      });

      const result = await getRoutes();
      expect(result).toEqual(mockData);
      expect(mockedMetroTransitAxios.get).toHaveBeenCalledWith("/routes");
    });

    it("should throw an error if fetching routes fails", async () => {
      mockedMetroTransitAxios.get.mockResolvedValue({ status: 500 });

      await expect(getRoutes()).rejects.toThrow("Failed to fetch routes");
    });
  });

  describe("getDirections", () => {
    it("should fetch directions successfully", async () => {
      const mockData: DirectionResponse[] = [
        { direction_id: 0, direction_name: "Northbound" },
      ];
      mockedMetroTransitAxios.get.mockResolvedValue({
        status: 200,
        data: mockData,
        cached: false,
      });

      const result = await getDirections("1");
      expect(result).toEqual(mockData);
      expect(mockedMetroTransitAxios.get).toHaveBeenCalledWith("/directions/1");
    });

    it("should throw an error if fetching directions fails", async () => {
      mockedMetroTransitAxios.get.mockResolvedValue({ status: 500 });

      await expect(getDirections("1")).rejects.toThrow(
        "Failed to fetch directions"
      );
    });
  });

  describe("getStops", () => {
    it("should fetch stops successfully", async () => {
      const mockData: StopResponse[] = [
        { place_code: "1", description: "Stop 1" },
      ];
      mockedMetroTransitAxios.get.mockResolvedValue({
        status: 200,
        data: mockData,
        cached: false,
      });

      const result = await getStops("1", "0");
      expect(result).toEqual(mockData);
      expect(metroTransitAxios.get).toHaveBeenCalledWith("/stops/1/0");
    });

    it("should throw an error if fetching stops fails", async () => {
      mockedMetroTransitAxios.get.mockResolvedValue({ status: 500 });

      await expect(getStops("1", "0")).rejects.toThrow("Failed to fetch stops");
    });
  });
});
