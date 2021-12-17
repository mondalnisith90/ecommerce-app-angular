import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerComponent } from './seller/seller.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "customer",
        component: CustomerComponent
      },
      {
        path: "seller",
        component: SellerComponent
      }
    ]
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "my-orders",
    component: MyOrdersComponent,
  },
  {
    path: "admin-signin",
    component: AdminSigninComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "customer-oders",
    component: CustomerOrdersComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  },
  {
    path: "add-to-cart",
    component: AddToCartComponent
  },
  {
    path: "buy-now",
    component: BuyNowComponent
  },
  {
    path: "product-details/:id",
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
