import { AppDataSource } from "../config/data-source";
import { Book } from "../models/Book";
import { UpdateResult } from "typeorm";

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);

    async createBook(bookData: Partial<Book>): Promise<Book> {
        const newBook = this.bookRepository.create(bookData);
        return await this.bookRepository.save(newBook);
    }

    async getBookByISBN(bookISBN: number): Promise<Book | null> {
        //console.log(bookISBN);
        return await this.bookRepository.findOneBy({ isbn: bookISBN });
    }

    async updateBook(bookISBN: number, newData: Partial<Book>): Promise<Book | null> {
        const updatedBook: UpdateResult = await this.bookRepository.update(bookISBN, newData);
        if(updatedBook.affected === 0) return null;
        return await this.bookRepository.findOneBy({ isbn: bookISBN });
    }

    async deleteBook(bookISBN: number): Promise<void> {
        await this.bookRepository.delete(bookISBN);
    }
}