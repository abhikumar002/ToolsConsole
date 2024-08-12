import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonValidatorComponent } from './console/json-validator/json-validator.component';
import { XmlValidatorComponent } from './console/xml-validator/xml-validator.component';
import { PasswordGeneratorComponent } from './console/password-generator/password-generator.component';
import { HomeComponent } from './console/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'json-validator', component: JsonValidatorComponent },
  { path: 'xml-validator', component: XmlValidatorComponent },
  { path: 'password-generator', component: PasswordGeneratorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
