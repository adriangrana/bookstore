import mongoose from 'mongoose';
import { connectDB } from './mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDB', () => {
  const mockConnect = mongoose.connect as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB witout env MONGO_URI', async () => {
    mockConnect.mockResolvedValueOnce(Promise.resolve());
    delete process.env.MONGO_URI;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith('bookstore');
    expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB connected');

    consoleLogSpy.mockRestore();
  });

  it('should connect to MongoDB successfully', async () => {
    mockConnect.mockResolvedValueOnce(Promise.resolve());
    process.env.MONGO_URI = 'mongodb://localhost:27017/bookstore';
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB connected');

    consoleLogSpy.mockRestore();
  });

  it('should handle connection error', async () => {
    const error = new Error('Connection failed');
    mockConnect.mockRejectedValueOnce(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env.MONGO_URI || 'bookstore');
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
