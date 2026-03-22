import api_endpoint from "../config/coreApi";
const allAlert = {
  post: async (config?: RequestInit) => {
    const url = `${api_endpoint}/v2/all-set-alerts`;
    try {
      const response = await fetch(url, {
        method: "POST",
        ...config,
        headers: {
          ...config?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      console.error(
        "API Error:",
        error instanceof Error ? error.message : "Unknown error"
      );
      throw error;
    }
  },
};
export default allAlert;
