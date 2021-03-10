import axios from 'axios';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
    });
  }

  post(endpoint, data) {
    return this.client.post(endpoint, data);
  }

  get(endpoint, data) {
    return this.client.get(endpoint, data);
  }
}

export default new ApiService();
