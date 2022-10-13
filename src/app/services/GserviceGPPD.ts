import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

import{Observable}from 'rxjs'
import { articulo } from '../model/articulo';
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


  metodoDelete(url:string,datos:any) {
    return this.http.delete(url,datos);

  }



  server:string='https://localhost:44373/';
  inser:string='/Insertar?usuario='

  creainser(tabala:string){
    return this.server+tabala+this.inser
  }


}


