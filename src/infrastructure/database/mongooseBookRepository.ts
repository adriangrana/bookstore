import mongoose, { Schema, Document, Model, ClientSession } from 'mongoose';
import { StoreBookRepository } from '../../domain/repositories/StoreBookRepository';
import { Book } from '../../domain/entities/Book';

interface BookDocument extends Document {
  title: string;
  author: string;
  year: number;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

export const BookMongooseModel: Model<BookDocument> = mongoose.model<BookDocument>('BookStore', bookSchema);

export class MongooseBookRepository implements StoreBookRepository {
  async saveBooks(books: Book[]): Promise<Book[] | null> {
    try {
      const result = await BookMongooseModel.insertMany(books);
      const savedBooks: Book[] = result.map(doc => ({
        id: doc.id.toString(),
        title: doc.title,
        author: doc.author,
        year: doc.year,
      }));
      return savedBooks;
    } catch (error) {
      console.error('Error saving books:', error);
      return null;
    }
  }
}