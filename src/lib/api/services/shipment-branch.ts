import { handleAxiosError } from "@/lib/utils/error-handler";
import type {
  ShipmentBranchLogsResponse,
  ShipmentBranchLog,
  ScanShipmentRequest,
  ScanShipmentResponse,
} from "../types/shipment-branch";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import { apiClient } from "../axios";

export const shipmentBranchSevice = {
  // Get all shipment branch logs
  async getAll(): Promise<ShipmentBranchLog[]> {
    try {
      const response = await apiClient.get<ShipmentBranchLogsResponse>(
        "/shipments/branch/logs"
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // Scan package (IN/OUT)
  async scan(data: ScanShipmentRequest): Promise<ShipmentBranchLog> {
    try {
      const response = await apiClient.post<ScanShipmentResponse>(
        "/shipments/branch/scan",
        data
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
