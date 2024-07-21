// Data API
import axios from 'axios';

const API_URL = 'http://localhost:3000/aggregated-data';

export const getHourlyAverage = async () => {
    return await axios.get(`${API_URL}/hourly-averages`)
}

export const getDailyAverage = async () => {
    return await axios.get(`${API_URL}/daily-averages`)
}

