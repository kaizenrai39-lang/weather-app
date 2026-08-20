// const API_URL = https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}
import axios from "axios";

const API_URL =  "https://api.openweathermap.org/data/2.5/weather";
const API_ID = "ab25f67ab7d91d911339ca6bb01a8caa"
export async function getWeatherData(cityname){
    const response = await axios.get(`${API_URL}?q=${cityname}&appid=${API_ID}`);
    return response.data
}
 