import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SingleProductPageComponent } from './pages/single-product-page/single-product-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'products', component: ProductsPageComponent },

  //{ path: 'products/search/:text', component: ProductsPageComponent },
  //{ path: 'cart', component: CartPageComponent },
  //{ path: 'single-product-page/:id', component: SingleProductPageComponent },
  { path: 'account-page', component: AccountPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'products/:id', component: SingleProductPageComponent },
  { path: 'products/search/:text', component: ProductsPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
