import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonValidatorComponent } from './console/json-validator/json-validator.component';
import { XmlValidatorComponent } from './console/xml-validator/xml-validator.component';
import { PasswordGeneratorComponent } from './console/password-generator/password-generator.component';
import { HomeComponent } from './console/home/home.component';
import { BaseEncoderDecoderComponent } from './console/base-encoder-decoder/base-encoder-decoder.component';
import { QrGeneratorComponent } from './console/qr-generator/qr-generator.component';
import { BarcodeGeneratorComponent } from './console/barcode-generator/barcode-generator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'json-validator', component: JsonValidatorComponent },
  { path: 'xml-validator', component: XmlValidatorComponent },
  { path: 'password-generator', component: PasswordGeneratorComponent },
  { path: 'base-encoder-decoder', component: BaseEncoderDecoderComponent },
  { path: 'qr-generator', component: QrGeneratorComponent },
  { path: 'barcode-generator', component: BarcodeGeneratorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
