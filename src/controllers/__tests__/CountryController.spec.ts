
import { CountryService } from '../../services/CountryService';
import { CountryController } from '../CountryController'
import { FastifyRequest, FastifyReply, } from "fastify"
import { mockedCountries } from './mockedData'

jest.mock('../../server');
jest.mock('../../services/CountryService')

const countryService = new CountryService()
const controller = new CountryController(countryService)

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

    countryService.getAllCountries = jest.fn().mockReturnValue({ countries: mockedCountries })

    await controller.handleListAllCountries(request, reply);

    const mock = reply.send as jest.Mock

    expect(mock).toHaveBeenCalledWith({ countries: mockedCountries })
  });

  it('should throw an error when page query parameter is missing', async () => {
    const modifiedRequestMock = {
      query: {
        rows: 10,
      },
    } as FastifyRequest;;
    const replyMock = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(controller.handleListAllCountries(modifiedRequestMock, replyMock)).rejects.toThrow('Missing page query parameter');
  });

  it('should throw an error when row query parameter is missing', async () => {
    const modifiedRequestMock = {
      query: {
        page: 1
      },
    } as FastifyRequest;;
    const replyMock = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(controller.handleListAllCountries(modifiedRequestMock, replyMock)).rejects.toThrow('Missing rows query parameter');
  });

});
