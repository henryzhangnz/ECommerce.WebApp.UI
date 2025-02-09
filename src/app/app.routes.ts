import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add-product', component: AddEditProductComponent },
  { path: 'edit-product/:id', component: AddEditProductComponent },
];
