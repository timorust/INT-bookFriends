import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsComponent} from "./pages/students/students.component";
import {AddPageComponent} from "./pages/add-page/add-page.component";

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddPageComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
