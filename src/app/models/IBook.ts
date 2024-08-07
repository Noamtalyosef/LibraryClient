import { IAuthor } from "./IAuthor";
import { IPublisher } from "./IPublisher";

export interface IBook {
    id : number;
    name : string;
    yearOfPublish : number;
    publisher : IPublisher;
    authors : IAuthor[];
    picturePath : string;
    copyPath : string;

}