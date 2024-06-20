import { Book } from '../../domain/entities/Book';
import { BookMongooseModel, MongooseBookRepository } from './mongooseBookRepository';

describe('MongooseBookRepository', () => {
  let mongooseBookRepository: MongooseBookRepository;
  let insertManyMock: jest.Mock;

  const books: Book[] = [
    { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
    { id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
  ];

  beforeEach(() => {
    mongooseBookRepository = new MongooseBookRepository();
    insertManyMock = jest.fn();
    jest.spyOn(BookMongooseModel, 'insertMany').mockImplementation(insertManyMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should save books and return saved books', async () => {
    insertManyMock.mockResolvedValue(books);
    const result = await mongooseBookRepository.saveBooks(books);
    expect(insertManyMock).toHaveBeenCalledWith(books);
    expect(result).toEqual(books);
  });

  it('should return null on error', async () => {
    const error = new Error('Insert failed');
    insertManyMock.mockRejectedValue(error);

    try {
      await mongooseBookRepository.saveBooks(books);
    } catch (error) {
      expect(insertManyMock).toHaveBeenCalledWith(books);
      expect(console.error).toHaveBeenCalledWith('Error saving books:', error);
    }

  });
});
