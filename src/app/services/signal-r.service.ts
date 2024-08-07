import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
   hubConnection! : signalR.HubConnection;
    private newBooksSubject = new BehaviorSubject<number[]>([]);
    private newAuthorsSubject = new BehaviorSubject<number[]>([]);
    private bookDeletedSubject = new BehaviorSubject<number>(0);
    private authorDeletedSubject = new BehaviorSubject<number>(0);


    constructor() { }
    

    get newBook () {
      return this.newBooksSubject.asObservable();
    }

    get newAuthor () {
      return this.newAuthorsSubject.asObservable();
    }

    get deletedBook(){
      return this.bookDeletedSubject.asObservable();
    }

    get deletedAuthor(){
      return this.authorDeletedSubject.asObservable();
    }
    
    public startConnection = () => {
      if(!this.hubConnection)
      {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5158/Library",{
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

        this.addTransferChartDataListener()
      }
             
      if(this.hubConnection.state == signalR.HubConnectionState.Disconnected)
      {
        this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
      }
    }
  

   public addTransferChartDataListener = () => {
    
   
      this.hubConnection.on("BookAdded",(data : number[])=>{
        this.newBooksSubject.next(data);
      })

      this.hubConnection.on("AuthorAdded",(data : number[])=>{
        
        this.newAuthorsSubject.next(data);
      })

      this.hubConnection.on("BookDeleted",(data : number)=>{
        console.log("signalR Deleted event:",data)
        this.bookDeletedSubject.next(data);
      })

      this.hubConnection.on("AuthorDeleted",(data : number)=>{
        
        this.authorDeletedSubject.next(data);
      })
  }
}

