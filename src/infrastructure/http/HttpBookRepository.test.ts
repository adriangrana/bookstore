import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { Book } from '../../domain/entities/Book';
import { HttpBookRepository } from './HttpBookRepository';
describe('HttpBookRepository', () => {
  let axiosMock: AxiosMockAdapter;
  let repository: HttpBookRepository;

  beforeEach(() => {
    axiosMock = new AxiosMockAdapter(axios);
    repository = new HttpBookRepository();
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should list all books', async () => {
    const books: Book[] = [
      { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
      { id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
    ];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: books });

    const result = await repository.listBooks();
    expect(result).toEqual(books);
  });

  it('should return an empty array when no books found', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] });

    const result = await repository.listBooks();
    expect(result).toEqual([]);
  });

  it('should get a book by code', async () => {
    const book: Book = { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 };

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: book });


    const result = await repository.getBookByCode('1');
    expect(result).toEqual(book);
  });

  it('should return null if book not found', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(axios, 'get').mockRejectedValueOnce({ response: { status: 400 } });

    const result = await repository.getBookByCode('16674432ae72ca307d86767f3');
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('No data found');

  });

  it('should handle error responses', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    axiosMock.onGet('http://fakebookstore.local/v1/books').reply(500);

    const result = await repository.listBooks();
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('An error occurred', expect.anything());

    consoleSpy.mockRestore();
  });
});
