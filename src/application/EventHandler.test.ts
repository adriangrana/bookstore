import { EventHandler } from './EventHandler';
import { Book } from '../domain/entities/Book';
import { ReadBookRepository } from '../domain/repositories/ReadBookRepository';
import { StoreBookRepository } from '../domain/repositories/StoreBookRepository';

class MockReadBookRepository implements ReadBookRepository {
  private books: Book[] = [
    { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
    { id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
  ];

  async listBooks(): Promise<Book[]> {
    return this.books;
  }

  async getBookByCode(code: string): Promise<Book | null> {
    return this.books.find(book => book.id === code) || null;
  }
}

class MockStoreBookRepository implements StoreBookRepository {
  async saveBooks(books: Book[]): Promise<Book[]> {
    return books;
  }
}

describe('EventHandler', () => {
  let eventHandler: EventHandler;
  let mockReadBookRepository: ReadBookRepository;
  let mockStoreBookRepository: StoreBookRepository;
  beforeEach(() => {
    mockReadBookRepository = new MockReadBookRepository();
    mockStoreBookRepository = new MockStoreBookRepository();
    eventHandler = new EventHandler(mockReadBookRepository, mockStoreBookRepository);
  });

  it('should list all books', async () => {
    const saveBooksSpy = jest.spyOn(mockStoreBookRepository, 'saveBooks');
    await eventHandler.handle({ action: 'LIST' });
    expect(saveBooksSpy).toHaveBeenCalledWith( [
      { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
      { id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
    ]);
  });

  it('should get a book by code', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await eventHandler.handle({ action: 'GET', code: '1' });
    expect(consoleSpy).toHaveBeenCalledWith('Book:', { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 });
  });

  it('should handle book not found', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await eventHandler.handle({ action: 'GET', code: '3' });
    expect(consoleSpy).toHaveBeenCalledWith('Book with code 3 not found');
  });

  it('should handle missing code for GET action', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await eventHandler.handle({ action: 'GET' });
    expect(consoleSpy).toHaveBeenCalledWith('Code is required for GET action');
  });

  it('should handle unknown action', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await eventHandler.handle({ action: 'UNKNOWN' as any });
    expect(consoleSpy).toHaveBeenCalledWith('Unknown action');
  });
});
