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
   // return this.http.post(url,datos);
    return this.http.post(url,datos)


  }
  metodoPut(url:string,datos:any) {
    return this.http.put(url,datos);
  }


  metodoDelete(url:string,) {
    return this.http.delete(url);

  }
  // metodo={
  //   Select:"/BuscarArticulos?p_Usr=",
  //   Insert:"/Add?p_usr=",
  //   Update:"/Put?p_usr=",
  //   Delete:"/Delete?p_id="
  // }
  // server="https://localhost:7232/"
  // url(tabla:any){
  //   return this.server+tabla
  // }

  // server:string='https://localhost:7232/api/';
  // inser:string='/Insertar/'

  // creaURLInsert(tabala:string){
  //   return this.server+tabala+this.inser
  // }


}


