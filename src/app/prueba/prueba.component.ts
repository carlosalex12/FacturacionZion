import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { ZzglobService } from '../FuncionesGlobales/zzglob.service';
import { GlobalService } from '../services/GserviceGPPD';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  msgs="holaaaa"
  data:any
  basicData: any;
  basicOptions: any;
  path:any
  constructor(
    public servicio:GlobalService,
   private zzglob:ZzglobService
  ) {

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#FFA726',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }



   }

  ngOnInit(): void {
    this.path="file:///E:/HOME/VCarlos/pdf/factura.pdf"
  }
imprimir(){

}
url(){
//this.servicio.url('Prueba');
console.log(this.zzglob.creaurl('Articulo',this.zzglob.metodo.Select))

//this.path="file:///E:/HOME/VCarlos/pdf/1.pdf"

}

  //http://localhost:8080/url?impresora=POS58&urlPdf=localhost/archivos/mi_pdf.pdf

}
