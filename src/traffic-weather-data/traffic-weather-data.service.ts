import axios from 'axios';

export class TrafficAndWeatherService {
  /**
   * To get traffic data from data.gov.sg
   * @param date
   * @returns
   */
  getTrafficData = async (date: string) => {
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
  getWeatherData = async (date: string) => {
    return await axios
      .get(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${date}`,
      )
      .then((response) => response.data);
  };
}
