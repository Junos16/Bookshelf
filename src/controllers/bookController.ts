import { Request, Response } from "express";
import { BookService } from "../services/bookService";

const bookService = new BookService();

export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const newBook = await bookService.createBook(req.body);
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

export const updateBook = async (req: Request, res:Response): Promise<void> => {
    try {
        const bookISBN = parseInt(req.params.isbn);
        const updatedBook = await bookService.updateBook(bookISBN, req.body);
        if(!updatedBook) res.status(404).json({ message: "Book not found" });
        else res.json(updatedBook);
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