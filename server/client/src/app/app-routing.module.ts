import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  },
  {
    path: "add-to-cart",
    component: AddToCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
