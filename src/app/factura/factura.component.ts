import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { facturas } from '../model/factura';
import { GlobalService } from '../services/GserviceGPPD';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FacturacionComponent } from '../facturacion/facturacion.component';
import { DetalleFacturaComponent } from '../detalle-factura/detalle-factura.component';
import { VariablesFacturacion } from '../facturacion/service/Variables-Facturacion';
import { ZzglobService } from '../FuncionesGlobales/zzglob.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  Factura: facturas = new facturas();
  datatable: any = [];
  valor1=""
  valor2=""
  Mtabla=false
  dialogRef1: any;
  displayedColumns: string[] = [

    'fac_num',
    'fac_doc',
    'fac_fec',
    'cli_cod',
    'fac_est',
    'fac_ser',
    'suc_cod',
    'fac_tot',
    'fac_sub0',
    'fac_sub1',
    'fac_dscto',
    'selecionar'

  ];
  loading = [false, false, false, false]
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router: Router,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    public dialog1: MatDialog,
    public gvbus:VariablesFacturacion,
    private zzgob:ZzglobService,

  ) {}

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
  }
  load(index:any,camp:string) {
    this.valor1=formatDate(this.valor1,'yyyy-MM-dd','en_US')
    this.valor2=formatDate(this.valor2,'yyyy-MM-dd','en_US')
    this.loading[index] = true;
    //console.log("campo: ",camp,"Valor1: ",this.valor1,"valor2: ",this.valor2);
    let param=this.gvariables.g_empid.id.id+"&p_camp="+camp+"&p_valor1="+this.valor1+"&p_valor2="+this.valor2+""
    this.GlobalService.metodoGet(this.zzgob.creaurl('Factura',this.zzgob.metodo.Select)+param
    ).subscribe((res: any) => {
      setTimeout(() => this.loading[index] = false, 100);
      this.datatable = res.result;
      this.dataSource.data = this.datatable;
      this.Mtabla=true
    });
}

  openDialogDetalle(id:any) {
    this.gvbus.g_fac_num=id.fac_num
this.gvbus.g_fac_doc=id.fac_doc
console.log(this.gvbus.g_fac_num);

    this.gvbus.gsubtotal0=id.fac_sub0
    this.gvbus.gsubtotal1=id.fac_sub1
    this.gvbus.g_fac_desc=id.fac_dscto
    this.gvbus.g_total=id.fac_tot
    this.gvbus.g_iva=id.fac_impto
    this.dialogRef1 = this.dialog1.open(DetalleFacturaComponent);
    this.dialogRef1.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  BuscarFac(){}
}
