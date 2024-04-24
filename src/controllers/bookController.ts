import { Request, Response } from "express";
import { BookService } from "../services/bookService";

const bookService = new BookService();

export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.file?.filename;
        const path = req.file?.path;
        const bookDataWithFile = {
            ...req.body,
            filename: name,
            filepath: path
        };

        const newBook = await bookService.createBook(bookDataWithFile);
        res.status(201).json(newBook);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookByISBN = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookISBN = parseInt(req.params.isbn);
        const book = await bookService.getBookByISBN(bookISBN);
        if(!book) res.status(404).json({ message: "Book not found" });
        else res.json(book);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { filterByKey, filterByValue, sortOrder, sortBy, limit, offset } = req.query;

        const books = await bookService.getBooks(
            filterByKey as string, 
            filterByValue as number | string, 
            sortBy as string, 
            sortOrder as "ASC" | "DESC", 
            parseInt(limit as string), 
            parseInt(offset as string)
        );

        if(!books) res.status(404).json({ message: "No books found" });
        else res.status(200).json(books);        
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const downloadBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookISBN = parseInt(req.params.isbn);
        const book = await bookService.getBookByISBN(bookISBN);
        const path = book?.filepath; 
        const name = book?.filename;
        if (path !== undefined && name !== undefined) {
            res.status(200).download(path, name);
        } else res.status(404).json({ message: "No file found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateBook = async (req: Request, res:Response): Promise<void> => {
    try {
        const bookISBN = parseInt(req.params.isbn);
        const bookData = { ...req.body };
        
        if (req.file) {
            const name = req.file?.filename;
            const path = req.file?.path;
            bookData.filename = name;
            bookData.filepath = path;
        }

        const updatedBook = await bookService.updateBook(bookISBN, bookData);
        if(!updatedBook) res.status(404).json({ message: "Book not found" });
        else res.status(201).json(updatedBook);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookISBN = parseInt(req.params.isbn);
        await bookService.deleteBook(bookISBN);
        res.status(204).end();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};