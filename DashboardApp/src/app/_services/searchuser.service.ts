import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class SearchuserService {
    private _http: Http;
    private jsonFileURL: string = "https://api.myjson.com/bins/7obqn";
    constructor(private http: Http) {
      this._http = http;
     }
    search(query:string, perPage:number, pageNumber:number){
      if(pageNumber> 0 && perPage > 0){
      return this._http.get('https://api.github.com/search/users?q=' + query + '&per_page='+ perPage +'&page=' + pageNumber);
      /* .flatMap((data) => data.json()['items']); */
      }
    }

    search_(query:string, perPage:number, pageNumber:number){
      if(pageNumber> 0 && perPage > 0){
      return this._http.get(this.jsonFileURL);
      /* .flatMap((data) => data.json()['items']); */
      }
    }

    getUserInfo(userName:string){
      return this._http.get('https://api.github.com/users/' + userName);
    }
  }
  
