import { ReadBookRepository } from '../domain/repositories/ReadBookRepository';
import { StoreBookRepository } from '../domain/repositories/StoreBookRepository';

interface Event {
  action: 'LIST' | 'GET';
  code?: string;
}

export class EventHandler {
  constructor(private readBookRepository: ReadBookRepository, private storeBookRepository: StoreBookRepository) {}

  async handle(event: Event): Promise<void> {
    switch (event.action) {
      case 'LIST':
        const books = await this.readBookRepository.listBooks();
        console.log('Books:', books);
        this.storeBookRepository.saveBooks(books);
        break;
      case 'GET':
        if (event.code) {
          const book = await this.readBookRepository.getBookByCode(event.code);
          if (book) {
            console.log('Book:', book);
            this.storeBookRepository.saveBooks([book]);
          } else {
            console.log(`Book with code ${event.code} not found`);
          }
        } else {
          console.log('Code is required for GET action');
        }
        break;
      default:
        console.log('Unknown action');
    }
  }
}
