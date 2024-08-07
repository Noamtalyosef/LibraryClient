import { IAuthor } from "./IAuthor";
import { IBook } from "./IBook";

export interface INewBook
{
    book : IBook,
    existingAuthorsIds : number[],
    newAuthors : IAuthor[],
    bookPicture : File,
    bookCopy : File
}