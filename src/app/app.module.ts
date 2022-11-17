import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './menu/login/login.component';
import { HomeComponent } from './menu/home/home.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { MaterialModule } from './NgMaterial/material/material.module';
import { tablaComponent } from './Usuario/tabla.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { FooterComponent } from './menu/footer/footer.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ClienteDialogoComponent } from './facturacion/cliente-dialogo/cliente-dialogo.component';
import { ArticuloDialogoComponent } from './facturacion/articulo-dialogo/articulo-dialogo.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { UnidaDialogoComponent } from './articulo/unida-dialogo/unida-dialogo.component'
import { CategoriaDialogoComponent } from './articulo/categoria-dialogo/categoria-dialogo.component';
import { ZzapplService } from './FuncionesGlobales/zzappl.service';
import { EmpresaComponent } from './empresa/empresa.component';
//importar HttpClientModule
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { ArticuloComponent } from './articulo/articulo.component';
import { FacturaComponent } from './factura/factura.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MenuModule } from './menu/menu.module';
///pdf
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
//prime
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FieldsetModule} from 'primeng/fieldset';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import { PruebaComponent } from './prueba/prueba.component';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {ChartModule} from 'primeng/chart';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SplitButtonModule} from 'primeng/splitbutton';
import {FocusTrapModule} from 'primeng/focustrap';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
//material
import {MatGridListModule} from '@angular/material/grid-list';
///cookies
import { CookieService } from 'ngx-cookie-service';

import { DatePipe } from '@angular/common';
//report
//import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
//notiflix
import * as printJS from 'print-js';
import { UnidadComponent } from './Catalogo/unidad/unidad.component';
import { SucursalComponent } from './Catalogo/sucursal/sucursal.component';
import { BodegaComponent } from './Catalogo/bodega/bodega.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoEncontradoComponent,
    tablaComponent,
    NavbarComponent,
    FooterComponent,
    ArticuloComponent,
    FacturaComponent,
    ClienteComponent,
    FacturacionComponent,
    ClienteDialogoComponent,
    ArticuloDialogoComponent,
    ExamplePdfViewerComponent,
    DetalleFacturaComponent,
    PruebaComponent,
    EmpresaComponent,
    CategoriaDialogoComponent,
    UnidaDialogoComponent,
    UnidadComponent,
    SucursalComponent,
    BodegaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
MenuModule,
ButtonModule,
TableModule,
DialogModule,
ReactiveFormsModule,
FieldsetModule,
MatSidenavModule,
CheckboxModule,
RadioButtonModule,
NgxExtendedPdfViewerModule,
ToastModule,
MessagesModule,
ChartModule,
MatGridListModule,
InputTextareaModule,
SplitButtonModule,
FocusTrapModule,
InputTextModule,
CalendarModule,

//BoldReportViewerModule





  ],
  providers: [CookieService,ZzapplService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
