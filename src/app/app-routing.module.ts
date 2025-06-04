import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { MultipartComponent } from './multipart/multipart.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'table',
    component:TableComponent
  },
  {
    path:'multipart',
    component:MultipartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
