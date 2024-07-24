import axios from 'axios';

const API_URL = 'http://localhost:3000/aggregated-data';

export const fetchHourlyData = async (date: Date) => {
    try {
        const response = await axios.get(`${API_URL}/hourly-averages`);
        const data = response.data.data;

        return data;
    } catch (error) {
        console.error('Error fetching hourly data:', error);
        return null;
    }
};
