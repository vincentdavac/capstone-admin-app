import api_endpoint from "../config/coreApi";
export interface buoyData {
  id: number;
  [key: string]: any;
}
//deployment-point
export const getBuoyByid = {
  async fetchBuoyById(buoyId: number,token: string, signal?: AbortSignal): Promise<buoyData> {
     const response = await fetch(
      `${api_endpoint}/deployment-point/${buoyId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal,
    });
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }
    return response.json();
  },
};
