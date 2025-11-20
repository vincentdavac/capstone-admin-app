import api_endpoint from "../config/coreApi";
const getAllAlerts = {
  get: async (brgyId:number) => {
     if (!brgyId) throw new Error("User ID is required");
    const url = `${api_endpoint}/get-all-alerts?barangay_id=${brgyId}`;
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(
        "API Error:",
        error instanceof Error ? error.message : "Unknown error"
      );
      throw error;
    }
  },
};
export default getAllAlerts;
