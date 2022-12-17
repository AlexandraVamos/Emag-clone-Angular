import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SingleProductPageComponent } from './pages/single-product-page/single-product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProductsService } from './services/products.service';
import { NavbarAuxComponent } from './components/navbar-aux/navbar-aux.component';
import { NavbarAuxListComponent } from './navigation/navbar-aux-list/navbar-aux-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './pages/products-page/products-list/products-list.component';
import { ProductsItemComponent } from './pages/products-page/products-list/products-item/products-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { RouterModule, UrlSegment } from '@angular/router';
import { ProfileComponent } from './components/navbar/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    SingleProductPageComponent,
    CartPageComponent,
    NavbarAuxComponent,
    NavbarAuxListComponent,
    LoginComponent,
    ProductsListComponent,
    ProductsItemComponent,
    NavbarComponent,
    CarouselComponent,
    AccountPageComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        matcher: (url) => {
          if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
            return {
              consumed: url,
              posParams: {
                username: new UrlSegment(url[0].path.slice(1), {})
              }
            };
          }

          return null;
        },
        component: ProfileComponent
      }
    ]),
  ],
  providers: [
    ProductsService,
    AuthService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

