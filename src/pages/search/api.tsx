// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Adjust the base URL as needed

export const fetchGesetze = () => axios.get(`${API_URL}/gesetze`);
