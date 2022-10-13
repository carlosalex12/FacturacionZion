import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Usuario } from '../model/usuario';
import{Observable}from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  metodoPost(url: string, datos:any) {
    return this.http.post(url, datos);
  }

  metodoPatch(url: string, dataAEditar:any) {
    return this.http.put(url, dataAEditar);
  }

  metodoDelete(url: string) {
    return this.http.delete(url);
  }




  constructor(private http:HttpClient) { }
  metodoGet(url: string, ) {
    return this.http.get(url);
  }
//instancio url con la url del back-end
urlget:string='https://localhost:44373/Usuario/Usuarios';
urlpost:string='https://localhost:44373/api/Usuario/InsertaUsuario';
urlput:string='https://localhost:44373/api/Usuario/ActualizaUsuario';
urldelete:string='https://localhost:44373/api/Usuario/Usuarios';
// metodo get para traer los datos
  getUsuario(){
    return this.http.get(this.urlget);
  }
// metodo post para insertar los datos
addUsuario(usuario:Usuario):Observable<Usuario>{
  return this.http.post<Usuario>(this.urlpost,usuario);
}
// metodo put para actualizar los datos
updateUsuario(usuario:Usuario):Observable<Usuario>{
  return this.http.put<Usuario>(this.urlput, usuario);
}
// metodo delete para eliminar  los datos
daleteUsuario(id:string){
return this.http.delete(this.urldelete+`/$(id)`);
}
}


