import api_endpoint from "../config/coreApi";
const setSurroundingAlert = {
  post: async () => {
  const url = `${api_endpoint}/set-alert-surrounding`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        'API Error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  },
};

export default setSurroundingAlert;
