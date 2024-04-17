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
    
    // async getBooks(
    //     filterBy?: string, 
    //     sortBy?: string, 
    //     sortOrder?: "ASC" | "DESC", 
    //     limit?: number, 
    //     offset?: number
    // ): Promise<Book[] | null> {
    //     const queryBuilder = this.bookRepository.createQueryBuilder().select("Book");

    //     if (filterBy) {
    //         queryBuilder.where(filterBy);
    //     }
        
    //     if (sortBy !== undefined && sortOrder) {
    //         queryBuilder.orderBy(sortBy, sortOrder);
    //     }

    //     if (limit !== undefined && offset !== undefined) {
    //         queryBuilder.skip(offset).take(limit);
    //     }

    //     return await queryBuilder.getMany();
    // }

    async getBooks(
        filterByKey?: string, 
        filterByValue?: number | string,
        sortBy?: string, 
        sortOrder?: "ASC" | "DESC", 
        limit?: number, 
        offset?: number
    ): Promise<Book[] | null> {
        const queryBuilder = this.bookRepository.createQueryBuilder("Book");
        if(filterByKey !== "" && filterByValue !== "" && filterByKey !== undefined && filterByValue !== undefined) {
            const filterBy = filterByKey + " = :value";
            queryBuilder.where(filterBy , { value: filterByValue });
        }
        if(sortBy !== undefined && sortOrder) queryBuilder.orderBy(sortBy, sortOrder);
        console.log(offset);
        if(limit !== undefined && offset !== undefined) queryBuilder.skip(offset).take(limit);
        return await queryBuilder.getMany();
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