import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { LoginGuard } from './components/guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  // ana sayfada bir şey yazmazsa product cmponenti aç
  {path:"",pathMatch:"full", component:ProductComponent},
  {path:"products", component:ProductComponent},
  {path:"products/category/:categoryId", component:ProductComponent},
  {path:"products/add", component:ProductAddComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"products/update",component:ProductUpdateComponent},
  {path:"products/update/:productId",component:ProductUpdateComponent}
  // bu sonradankaldır
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
