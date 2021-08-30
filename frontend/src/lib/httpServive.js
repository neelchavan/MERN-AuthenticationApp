/* eslint-disable no-useless-catch */
import axios from 'axios';

const httpService = {
  get: async (route) => {
    try {
      const response = await axios.get(`http://localhost:4000${route}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  post: async (route, body) => {
    try {
      const response = await axios.post(`http://localhost:4000${route}`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default httpService;
