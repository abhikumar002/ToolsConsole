import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonValidatorComponent } from './console/json-validator/json-validator.component';
import { HomeComponent } from './console/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'json-validator', component: JsonValidatorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
