import { Book } from "../entities/Book";

export interface ReadBookRepository {
  listBooks(): Promise<Book[]>;
  getBookByCode(id: string): Promise<Book | null>;
}
