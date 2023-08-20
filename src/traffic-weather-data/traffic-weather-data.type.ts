interface Location {
  latitude: number;
  longitude: number;
}

interface ImageMetadata {
  height: number;
  width: number;
  md5: string;
}

interface Camera {
  timestamp: string;
  image: string;
  location: Location;
  camera_id: string;
  image_metadata: ImageMetadata;
}

interface TrafficDataItem {
  timestamp: string;
  cameras: Camera[];
}

export interface TrafficDataApiResponse {
  items: TrafficDataItem[];
  api_info: {
    status: string;
  };
}

interface LabelLocation {
  latitude: number;
  longitude: number;
}

interface AreaMetadata {
  name: string;
  label_location: LabelLocation;
}

interface ValidPeriod {
  start: string;
  end: string;
}

interface Forecast {
  area: string;
  forecast: string;
}

interface ForecastItem {
  update_timestamp: string;
  timestamp: string;
  valid_period: ValidPeriod;
  forecasts: Forecast[];
}

interface APIInfo {
  status: string;
}

export interface WeatherDataApiResponse {
  area_metadata: AreaMetadata[];
  items: ForecastItem[];
  api_info: APIInfo;
}
