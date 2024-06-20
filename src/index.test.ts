import { EventAdapter } from './infrastructure/adapter/eventAdapter';
import { InputEvent } from './domain/entities/InputEvent';

// Mock dependencies
jest.mock('./infrastructure/adapter/eventAdapter');

describe('Index', () => {
  let eventAdapterMock: jest.Mocked<EventAdapter>;

  beforeEach(() => {
    eventAdapterMock = new EventAdapter() as jest.Mocked<EventAdapter>;
    EventAdapter.prototype.emitEvent = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should emit LIST and GET event', () => {
    const listInput: InputEvent = {
      event: 'booksrequest',
      action: 'LIST',
    };
		const getInput: InputEvent = {
      event: 'booksrequest',
      action: 'GET',
      code: '16674432ae72ca307d86767f3',
    };

    // Requiring the index file to trigger the event emission
    require('./index');

    expect(EventAdapter.prototype.emitEvent).toHaveBeenCalledWith(listInput);
    expect(EventAdapter.prototype.emitEvent).toHaveBeenCalledWith(getInput);

  });

});
