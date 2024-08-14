import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonValidatorComponent } from './console/json-validator/json-validator.component';
import { JsonValidationService } from './Services/json-validation.service';
import { HomeComponent } from './console/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { XmlValidatorComponent } from './console/xml-validator/xml-validator.component';
import { XmlValidatorService } from './Services/xml-validator.service';
import { PasswordGeneratorComponent } from './console/password-generator/password-generator.component';
import { PasswordGeneratorService } from './Services/password-generator.service';
import { BaseEncoderDecoderComponent } from './console/base-encoder-decoder/base-encoder-decoder.component';
import { BaseEncoderDecoderService } from './Services/base-encoder-decoder.service';
import { QrGeneratorComponent } from './console/qr-generator/qr-generator.component';
import { QrGeneratorService } from './Services/qr-generator.service';
@NgModule({
  declarations: [
    AppComponent,
    JsonValidatorComponent,
    HomeComponent,
    XmlValidatorComponent,
    PasswordGeneratorComponent,
    PasswordGeneratorComponent,
    BaseEncoderDecoderComponent,
    QrGeneratorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    ZXingScannerModule,
    NgxQRCodeModule
  ],
  providers: [
    JsonValidationService,
    XmlValidatorService,
    PasswordGeneratorService,
    BaseEncoderDecoderService,
    QrGeneratorService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
