import { NgModule } from '@angular/core';
///importamos la rutas
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './menu/login/login.component';
import { HomeComponent } from './menu/home/home.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FacturaComponent } from './factura/factura.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { PruebaComponent } from './prueba/prueba.component';
import { VigilanteGuard } from './vigilante.guard';
import { EmpresaComponent } from './empresa/empresa.component';
import { SucursalComponent } from './Catalogo/sucursal/sucursal.component';
import { BodegaComponent } from './Catalogo/bodega/bodega.component';
import { UnidadComponent } from './Catalogo/unidad/unidad.component';

//import { HomeModule } from './components/home/home.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  //{
  //  path:'homes',loadChildren:()=> import('./components/home/home.module').then(x=>HomeModule)

  //},
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[VigilanteGuard]
  },

  {
    path: 'facturacion/:id/:emp',
    component: FacturacionComponent,
   canActivate:[VigilanteGuard]
  },
  {
    path: 'empresa/:id/:emp',
    component: EmpresaComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'sucursal/:id/:emp',
    component: SucursalComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'bodega/:id/:emp',
    component: BodegaComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'unidad/:id/:emp',
    component: UnidadComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'home/:id/:emp',
    component: HomeComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'articulo/:id/:emp',
    component: ArticuloComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'factura/:id/:emp',
    component: FacturaComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'cliente/:id/:emp',
    component: ClienteComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: 'prueba',
    component: PruebaComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path: '**',
    component: NoEncontradoComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
