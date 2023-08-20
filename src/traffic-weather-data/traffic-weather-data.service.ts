import axios from 'axios';
import {
  TrafficDataApiResponse,
  WeatherDataApiResponse,
} from './traffic-weather-data.type';

export class TrafficAndWeatherService {
  /**
   * To get traffic data from data.gov.sg
   * @param date
   * @returns
   */
  getTrafficData = async (date: string): Promise<TrafficDataApiResponse> => {
    return await axios
      .get(
        `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${date}`,
      )
      .then((response) => response.data);
  };

  /**
   * To get weather data from data.gov.sg
   * @param date
   * @returns
   */
  getWeatherData = async (date: string): Promise<WeatherDataApiResponse> => {
    return await axios
      .get(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${date}`,
      )
      .then((response) => response.data);
  };
}
