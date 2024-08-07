import { IBook } from "./IBook";
import { ICity } from "./ICity";

export interface IAuthor{
    id : number;
    firstName : string;
    lastName : string;
    yearOfBirth : number;
    city : ICity;
    books : IBook[];
    
}

