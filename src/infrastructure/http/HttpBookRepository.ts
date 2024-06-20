
import axios from 'axios';
import { Book } from '../../domain/entities/Book';
import { ReadBookRepository } from '../../domain/repositories/ReadBookRepository';
import { config } from 'dotenv';
config();

export class HttpBookRepository implements ReadBookRepository {
  private readonly baseUrl: string = process.env['BOOKSTORE_URL'] || 'http://fakebookstore.local/v1';

  async listBooks(): Promise<Book[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/books`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  async getBookByCode(code: string): Promise<Book | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/book/${code}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  private handleError(error: any): void {
    if (error.response && error.response.status === 400) {
      console.error('No data found');
    } else {
      console.error('An error occurred', error);
    }
  }
}
