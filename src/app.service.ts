import { Injectable } from '@nestjs/common';
import { TrafficAndWeatherService } from './traffic-weather-data/traffic-weather-data.service';
import {
  Camera,
  LocationForecast,
} from './traffic-weather-data/traffic-weather-data.type';

@Injectable()
export class AppService {
  /**
   * To get both traffic and weather data. After that, we will process the data.
   * @param date
   * @returns
   */
  getAndProcessTrafficAndWeatherData = async (date: string) => {
    const trafficAndWeatherService = new TrafficAndWeatherService();
    const trafficRawData = await trafficAndWeatherService.getTrafficData(date);
    const weatherRawData = await trafficAndWeatherService.getWeatherData(date);

    const cameras = trafficRawData.items[0].cameras;
    const locations = weatherRawData.area_metadata;

    const locationsResult: LocationForecast[] = [];

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      let nearestTrafficCam: Camera;
      let minDifference = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < cameras.length; i++) {
        const camera = cameras[i];
        const lattitudeDifference = Math.abs(
          camera.location.latitude - location.label_location.latitude,
        );
        const longitudeDifference = Math.abs(
          camera.location.longitude - location.label_location.longitude,
        );
        const totalDifference = lattitudeDifference + longitudeDifference;
        if (totalDifference < minDifference) {
          minDifference = totalDifference;
          nearestTrafficCam = { ...camera };
        }
      }
      if (nearestTrafficCam) {
        const locationObj: LocationForecast = {
          name: location.name,
          forecast: weatherRawData.items[0].forecasts.find(
            (forecast) => forecast.area == location.name,
          ).forecast,
          trafficImage: nearestTrafficCam.image,
        };
        locationsResult.push(locationObj);
      }
    }

    return { locationsResult };
  };
}
