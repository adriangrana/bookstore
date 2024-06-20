import { InputEvent } from './domain/entities/InputEvent';
import { EventAdapter } from './infrastructure/adapter/eventAdapter';
import { MongooseBookRepository } from './infrastructure/database/mongooseBookRepository';

// Create an instance of the event adapter
const eventAdapter = new EventAdapter();

// Define the input events
const listInput: InputEvent = {
  event: 'booksrequest',
  action: 'LIST',
};

const getInput: InputEvent = {
  event: 'booksrequest',
  action: 'GET',
  code: '667440dec2f5f006a2ef5375',  // This should be a valid book code
};

eventAdapter.emitEvent(listInput);

eventAdapter.emitEvent(getInput);

