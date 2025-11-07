import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios;

describe('throttledGetDataFromApi', () => {
  const mockData = { id: 1, title: 'Test Post' };
  const relativePath = '/posts/1';

  beforeEach(() => {
    jest.clearAllMocks();

    (mockedAxios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = mockedAxios.create().get;

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
