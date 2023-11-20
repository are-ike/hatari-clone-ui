import axios from "axios";

const baseUrl = 'https://hatari-clone.onrender.com/projects';

const getEvents = async ({ projectId, page }) => {
  try {
    const response = await axios.get(`${baseUrl}/${projectId}/events`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const getEvent = async ({ projectId, eventId }) => {
  try {
    const response = await axios.get(`${baseUrl}/${projectId}/${eventId}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const eventApis = {
  getEvent,
  getEvents,
};
