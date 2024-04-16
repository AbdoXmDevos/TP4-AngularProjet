import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";

 const routes: Routes = [
   {path : "login",component:LoginComponent},

   {
     path : "admin" , component : AdminTemplateComponent ,canActivate : [AuthenticationGuard ] ,children:[
       {path : "product" , component : ProductComponent},
       {path : "newProduct" , component : NewProductComponent},
       {path : "editProduct/:id",component : EditProductComponent},
       {path : "home" , component : HomeComponent},

     ]
   },


     {path : "", redirectTo : "login" , pathMatch :'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
