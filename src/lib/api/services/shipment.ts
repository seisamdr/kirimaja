import { handleAxiosError } from "@/lib/utils/error-handler";
import type {
  CreateShipmentRequest,
  Shipment,
  ShipmentDetailResponse,
  ShipmentResponse,
} from "../types";
import type { AxiosErrorType } from "@/lib/utils/api-error-types";
import { apiClient } from "../axios";

export const shipmentService = {
  // Get all shipments
  async getAll(): Promise<Shipment[]> {
    try {
      const response = await apiClient.get<ShipmentResponse>("/shipments");
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // Get shipment by ID
  async getById(id: number): Promise<Shipment> {
    try {
      const response = await apiClient.get<ShipmentDetailResponse>(
        `/shipments/${id}`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // Create new shipment
  async create(data: CreateShipmentRequest): Promise<Shipment> {
    try {
      const response = await apiClient.post<ShipmentDetailResponse>(
        "/shipments",
        data
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // Download PDF
  async downloadPdf(id: number): Promise<Blob> {
    try {
      const response = await apiClient.get(`/shipments/${id}/pdf`, {
        responseType: "blob",
      });
      return response.data as Blob;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
