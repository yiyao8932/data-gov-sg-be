import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import moment from 'moment';

jest.mock('axios', () => ({
  default: jest.requireActual('axios'),
}));

jest.mock('moment', () => ({
  default: jest.requireActual('moment'),
}));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Traffic and Weather Data', () => {
    it('should have Ang Mo Kio!"', async () => {
      const location = await appController
        .getTrafficAndWeatherData(
          moment().format('YYYY-MM-DD') + 'T' + moment().format('HH:mm:ss'),
        )
        .then((response) => response.locationsResult[0]);
      expect(location).toHaveProperty('name', 'Ang Mo Kio');
    });
  });
});
