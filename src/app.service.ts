import { Injectable } from '@nestjs/common';
import { TrafficAndWeatherService } from './traffic-weather-data/traffic-weather-data.service';
import {
  AreaMetadata,
  Camera,
  Location,
  TrafficImage,
} from './traffic-weather-data/traffic-weather-data.type';
import * as _ from 'lodash';

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

    const cameras: Camera[] = trafficRawData.items[0].cameras;
    const locations: AreaMetadata[] = weatherRawData.area_metadata;

    let locationsResult: Location[] = [];

    // Iterate through all the cameras and get the location
    for (let i = 0; i < cameras.length; i++) {
      const camera: Camera = cameras[i];

      // We check the nearest location in weather API by calculating the distance between the camera location
      // and the location listed in the weather API
      let nearestLocation: AreaMetadata;
      let minDifference: number = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < locations.length; j++) {
        const location: AreaMetadata = locations[j];
        const lattitudeDifference: number = Math.abs(
          camera.location.latitude - location.label_location.latitude,
        );
        const longitudeDifference: number = Math.abs(
          camera.location.longitude - location.label_location.longitude,
        );
        const totalDifference: number =
          lattitudeDifference + longitudeDifference;
        if (totalDifference < minDifference) {
          minDifference = totalDifference;
          nearestLocation = { ...location };
        }
      }

      if (nearestLocation) {
        const existingLocationObj: Location = locationsResult.find(
          (location) => location.name == nearestLocation.name,
        );

        const trafficImageObj: TrafficImage = {
          image: camera.image,
          latitude: camera.location.latitude,
          longitude: camera.location.longitude,
        };

        if (existingLocationObj) {
          existingLocationObj.trafficImage.push(trafficImageObj);
        } else {
          const locationObj: Location = {
            name: nearestLocation.name,
            forecast: weatherRawData.items[0].forecasts.find(
              (forecast) => forecast.area == nearestLocation.name,
            ).forecast,
            trafficImage: [trafficImageObj],
          };
          locationsResult.push(locationObj);
        }
      }
    }
    locationsResult = _.sortBy(locationsResult, ['name']);

    return { locationsResult };
  };
}
