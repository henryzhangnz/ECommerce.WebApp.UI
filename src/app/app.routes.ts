import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AddEditProductComponent } from './components/product/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login-page/login.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'add-product',
    component: AddEditProductComponent,
    canActivate: [roleGuard],
  },
  {
    path: 'edit-product/:id',
    component: AddEditProductComponent,
    canActivate: [roleGuard],
  },
];
