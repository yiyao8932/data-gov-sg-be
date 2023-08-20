export interface Location {
  latitude: number;
  longitude: number;
}

export interface ImageMetadata {
  height: number;
  width: number;
  md5: string;
}

export interface Camera {
  timestamp: string;
  image: string;
  location: Location;
  camera_id: string;
  image_metadata: ImageMetadata;
}

export interface TrafficDataItem {
  timestamp: string;
  cameras: Camera[];
}

export interface TrafficDataApiResponse {
  items: TrafficDataItem[];
  api_info: {
    status: string;
  };
}

export interface LabelLocation {
  latitude: number;
  longitude: number;
}

export interface AreaMetadata {
  name: string;
  label_location: LabelLocation;
}

export interface ValidPeriod {
  start: string;
  end: string;
}

export interface Forecast {
  area: string;
  forecast: string;
}

export interface ForecastItem {
  update_timestamp: string;
  timestamp: string;
  valid_period: ValidPeriod;
  forecasts: Forecast[];
}

export interface APIInfo {
  status: string;
}

export interface WeatherDataApiResponse {
  area_metadata: AreaMetadata[];
  items: ForecastItem[];
  api_info: APIInfo;
}

export interface LocationForecast {
  name: string;
  forecast: string;
  trafficImage: string;
}

export interface ForecastData {
  locationsResult: LocationForecast[];
}
