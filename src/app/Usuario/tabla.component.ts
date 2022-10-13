import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})


////Trae los datos del baken
export class tablaComponent implements OnInit {




  //crear variable de tipo usuario
  usuario:Usuario = new Usuario();
  datatable:any=[];
///
displayedColumns: string[] = ['usr_cod', 'usr_nom', 'usr_est', 'usr_treg','usr_clv', 'usr_tacc', 'grp_cod', 'usr_aud','usr_fec_ult', 'usr_vig_clv', 'usr_dom','boton'];



///
constructor(private usuarioService:UsuarioService){}

ngOnInit(): void{
  ///inicializar la datatable
this.ondatatable();
}

ondatatable(){
this.usuarioService.getUsuario().subscribe((res: any) =>{
    this.datatable=res.Data;
    ///datasource si iguala ala respuesta del get para imprimir los datos
this.dataSource.data=this.datatable
    console.log(res.Data);
  }
);


}
dataSource = new MatTableDataSource<Usuario>(this.datatable.Data);
@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

OnAddusuario(usuario:Usuario):void{
  this.usuarioService.addUsuario(usuario).subscribe(res=>{
if(res){
  this.clear();
  this.ondatatable();
}else{

}}); }

onUpdateUsuario(usuario:Usuario):void{
  this.usuarioService.updateUsuario(usuario).subscribe(res => {
    if(res){
      alert(`La mascota número ${usuario} se ha modificado con exito!`);
      this.clear();
      this.ondatatable();
      console.log('usuario');
      console.log(usuario);
    } else {
      alert('Error! :(')
    }
  });
}

onSetData(select:any){
  this.usuario.usr_cod=select.usr_cod;
  this.usuario.usr_nom=select.usr_nom;
  this.usuario.usr_est=select.usr_est;
  this.usuario.usr_treg=select.usr_treg;
  this.usuario.usr_clv=select.usr_clv;
  this.usuario.usr_tacc=select.usr_tacc;
  this.usuario.grp_cod=select.grp_cod;
  this.usuario.usr_aud=select.usr_aud;
  this.usuario.usr_fec_ult=select.usr_fec_ult;
  this.usuario.usr_vig_clv=select.usr_vig_clv;
  this.usuario.usr_dom=select.usr_dom;

  }

clear(){
this.usuario.grp_cod="";
this.usuario.usr_aud="";;
this.usuario.usr_clv="";;
this.usuario.usr_cod="";;
this.usuario.usr_dom="";;
this.usuario.usr_est="";;
this.usuario.usr_fec_ult="";;
this.usuario.usr_nom="";;
this.usuario.usr_tacc="";;
this.usuario.usr_treg="";;
this.usuario.usr_vig_clv=0;;
}

}
