import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { facturas } from '../model/factura';
import { GlobalService } from '../services/GserviceGPPD';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  emp_cod: string="";

  fac_num: number=0;

  fac_fec: string="";

  fac_est:  string="";

  fac_total: number=0;

  cli_cod: string="";

  Factura:facturas = new facturas ();
  datatable:any=[];
  displayedColumns: string[] = ['emp_cod', 'fac_num', 'fac_fec', 'fac_est','fac_total','cli_cod','boton'];
  constructor(

    private readonly _rutaDatos: ActivatedRoute,
    private _router:Router,
    private GlobalService:GlobalService,
    private gvariables:VariablesGlobalesService
  ) { }

  ngOnInit(): void {

    console.log('nombre')

    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params
    };
    this.ondatatable();
  }


  ondatatable(){
    this.GlobalService

    .metodoGet(`https://localhost:44381/Factura/GetAll?p_usr=`+this.gvariables.g_empid.id.id)
    .subscribe((res:any) => {
      this.datatable=res;

    ///datasource si iguala ala respuesta del get para imprimir los datos
this.dataSource.data=this.datatable
    console.log(res.Data);
    });}


    dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onSetData(select:any){
      this.Factura.emp_cod=select.emp_cod;
      this.Factura.fac_num=select.fac_num;
      this.Factura.fac_fec=select.fac_fec;
      this.Factura.fac_est=select.fac_est;
      this.Factura.fac_total=select.fac_total;
      this.Factura.cli_cod=select.cli_cod;

      }




      OnAddusuario(Factura:facturas):void{

        console.log(this.gvariables.g_empid.id.id)
        this.GlobalService
        .metodoPost('https://localhost:44373/Factura/Insertar?usuario='+this.gvariables.g_empid.id.id,{
        emp_cod:this.Factura.emp_cod,
        fac_num:this.Factura.fac_num,
        fac_fec:this.Factura.fac_fec,
        fac_est:this.Factura.fac_est,
        fac_total:this.Factura.fac_total,
        cli_cod:this.Factura.cli_cod,
      })
      .subscribe((resultado)=>{

        alert('FACTURA AÑADIDO')
        this.ondatatable();
        this.clear();
        console.log(resultado);

      })

              }

            ///actualizar articulo
            onUpdateArticulo(Factura:facturas):void{
            this.GlobalService
            .metodoPut('https://localhost:44373/Factura/Actualizar?usuario='+this.gvariables.g_empid.id.id,{
              emp_cod:this.Factura.emp_cod,
              fac_num:this.Factura.fac_num,
              fac_fec:this.Factura.fac_fec,
              fac_est:this.Factura.fac_est,
              fac_total:this.Factura.fac_total,
              cli_cod:this.Factura.cli_cod,
          })
          .subscribe((resultado)=>{

            alert('FACTURA ACTUALIZADO')
            this.ondatatable();
            this.clear();
            console.log(resultado);

          })}
            ///Eliminar
            /*
              onDeleteArticulo(Factura:facturas):void{
              this.facturaservice
              .metodoPut('https://localhost:44373/Cliente/Eliminar?usuario='+this.gvariables.g_empid.id.id,{
                cli_cod:this.cliente.cli_cod,
            })
            .subscribe((resultado)=>{

              alert('ARTICULO ELIMINADO')
              this.ondatatable();
              this.clear();
              console.log(resultado);

            })
            }

            */

            ///

            regresar(){
              console.log(this.gvariables.g_empid)
              this._router.navigate(


                [`/home/`+this.gvariables.g_empid.id.id]

              )

            }

      clear(){
      this.Factura.emp_cod=""
      this.Factura.fac_num=0
      this.Factura.fac_fec=""
      this.Factura.fac_est=""
      this.Factura.fac_total=0
      this.Factura.cli_cod=""


      }




}
