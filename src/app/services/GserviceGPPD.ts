import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }


  metodoGet(url: string, ) {
    return this.http.get(url);
  }
  metodoPost(url:string,datos:any) {
    return this.http.post(url,datos);
  }
  metodoPut(url:string,datos:any) {
    return this.http.put(url,datos);
  }


  metodoDelete(url:string,) {
    return this.http.delete(url);

  }
  metodo={
    Select:"/GetAll?p_usr=",
    Insert:"/Add?p_usr=",
    Update:"/Put?p_usr=",
    Delete:"/Delete?p_id="
  }

  url(tabla:any,metodo:any){
    return this.server+tabla+metodo
  }

  server:string='https://localhost:44381/';
  inser:string='/Add?p_usr='

  creaURLInsert(tabala:string){
    return this.server+tabala+this.inser
  }


}


