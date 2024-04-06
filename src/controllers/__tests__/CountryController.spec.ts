
import { CountryService } from '../../services/CountryService';
import { CountryController } from '../CountryController'
import { FastifyRequest, FastifyReply, } from "fastify"
import { mockedCountries } from './mockedData'

jest.mock('../../server');
jest.mock('../../services/CountryService')

describe('CountryController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return countries from page 1 and return 200', async () => {
    const request = {
      query: {
        page: 1,
        rows: 10
      },
    } as FastifyRequest;
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as FastifyReply;

    const cs = new CountryService()
    cs.getAllCountries = jest.fn().mockReturnValue({ countries: mockedCountries })
    const controller = new CountryController(cs)

    await controller.handleListAllCountries(request, reply);

    const mock = reply.send as jest.Mock

    expect(mock).toHaveBeenCalledWith({ countries: mockedCountries })
  });
});
