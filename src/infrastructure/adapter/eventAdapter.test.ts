import { EventAdapter } from './eventAdapter';
import { EventHandler } from '../../application/EventHandler';
import { HttpBookRepository } from '../http/HttpBookRepository';
import { MongooseBookRepository } from '../database/mongooseBookRepository';
import { InputEvent } from '../../domain/entities/InputEvent';

// Mock dependencies
jest.mock('../../application/EventHandler');
jest.mock('../../infrastructure/http/HttpBookRepository');
jest.mock('../../infrastructure/database/MongooseBookRepository');
jest.mock('../../infrastructure/database/mongoose', () => ({
  connectDB: jest.fn(),
}));

describe('EventAdapter', () => {
  let eventAdapter: EventAdapter;
  let eventHandlerMock: jest.Mocked<EventHandler>;

  beforeEach(() => {
    const httpBookRepository = new HttpBookRepository();
    const mongooseBookRepository = new MongooseBookRepository();
    eventHandlerMock = new EventHandler(httpBookRepository, mongooseBookRepository) as jest.Mocked<EventHandler>;
    EventHandler.prototype.handle = jest.fn();

    eventAdapter = new EventAdapter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle LIST action', async () => {
    const listInput: InputEvent = {
      event: 'booksrequest',
      action: 'LIST',
    };

    eventAdapter.emitEvent(listInput);

    expect(EventHandler.prototype.handle).toHaveBeenCalledWith(listInput);
  });

  it('should handle GET action', async () => {
    const getInput: InputEvent = {
      event: 'booksrequest',
      action: 'GET',
      code: '1',
    };

    eventAdapter.emitEvent(getInput);

    expect(EventHandler.prototype.handle).toHaveBeenCalledWith(getInput);
  });
});