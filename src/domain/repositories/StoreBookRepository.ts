import { Book } from "../entities/Book";

export interface StoreBookRepository {
  saveBooks(books: Book[]): Promise<Book[] | null>;
}
