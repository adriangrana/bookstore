import { EventEmitter } from 'events';
import { EventHandler } from '../../application/EventHandler';
import { HttpBookRepository } from '../http/HttpBookRepository';
import { InputEvent } from '../../domain/entities/InputEvent';
import { connectDB } from '../database/mongoose';
import { MongooseBookRepository } from '../database/mongooseBookRepository';

// Class to handle event subscription and handling
export class EventAdapter {
  private events: EventEmitter;
  private eventHandler: EventHandler;

  constructor() {
    this.events = new EventEmitter();
    const httpBookRepository = new HttpBookRepository();
    const mongooseBookRepository = new MongooseBookRepository();
    this.eventHandler = new EventHandler(httpBookRepository, mongooseBookRepository);
    connectDB();
    this.subscribeEvents();
  }

  // Method to subscribe to events
  private subscribeEvents() {
    this.events.on('booksrequest', this.handleEvent.bind(this));
  }

  // Method to handle events
  private async handleEvent(eventData: InputEvent) {
    console.log(`Event received: ${JSON.stringify(eventData)}`);
    await this.eventHandler.handle(eventData);
  }

  // Method to emit events
  public emitEvent(eventData: InputEvent) {
    this.events.emit(eventData.event, eventData);
  }
}
