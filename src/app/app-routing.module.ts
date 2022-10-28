import { NgModule } from '@angular/core';
///importamos la rutas
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './menu/login/login.component';
import { HomeComponent } from './menu/home/home.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FacturaComponent } from './factura/factura.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PruebaComponent } from './prueba/prueba.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
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
    //canActivate:[AuthGuard]
  },

  {
    path: 'facturacion/:id/:emp',
    component: FacturacionComponent,
  },
  {
    path: 'home/:id/:emp',
    component: HomeComponent,
  },
  {
    path: 'articulo/:id/:emp',
    component: ArticuloComponent,
  },
  {
    path: 'factura/:id/:emp',
    component: FacturaComponent,
  },
  {
    path: 'cliente/:id/:emp',
    component: ClienteComponent,
  },
  {
    path: 'prueba',
    component: PruebaComponent,
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
