## Description

This is the backend for Weather Forecast & Traffic Cam Website. The data is fetched from the Traffic Images API https://data.gov.sg/dataset/traffic-images and Weather Forecast https://data.gov.sg/dataset/weather-forecast

The Traffic Images API contains images, latitude and longitude of the traffic cameras in Singapore.

The Weather Forecast API contains location names, forecast of the locations, latitude and longitude of the locations.

One of the key problems to solve is to get the location name of the traffic cameras.

To do that, we get all the locations (latitude and longitude) from Traffic Images API and compare with the locations listed in Weather Forecast API. We calculate the shortest distance between the traffic camera and the location listed in Weather Forecast API and then assign the location name to the traffic camera location.

`GET /traffic-and-weather-data` is the only API exposed in this backend to get and process the data mentioned above. It requires a date (YYYY-MM-DD[T]HH:mm:ss) to be passed in as query parameter.

## Tech stack used

Node.js\
Nest.js\
Jest

## Prerequisite

Node.js version 18.17.1

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

The local instance is available on http://localhost:8080 when it's running

## Test

```bash
# unit tests
$ npm run test
```
