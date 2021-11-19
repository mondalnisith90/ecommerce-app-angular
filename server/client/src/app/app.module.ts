import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryItemCardComponent } from './category-item-card/category-item-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { WishlistComponent } from './wishlist/wishlist.component';
import {MatDividerModule} from '@angular/material/divider';
import { AddToCartCardItemComponent } from './add-to-cart-card-item/add-to-cart-card-item.component';
import { WishListCardComponent } from './wish-list-card/wish-list-card.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    AddToCartComponent,
    CategoryItemCardComponent,
    ProductCardComponent,
    WishlistComponent,
    AddToCartCardItemComponent,
    WishListCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
