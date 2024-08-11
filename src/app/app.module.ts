import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonValidatorComponent } from './console/json-validator/json-validator.component';
import { JsonBeautifierComponent } from './console/json-beautifier/json-beautifier.component';
import { JsonValidationService } from './Services/json-validation.service';
import { HomeComponent } from './console/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { XmlValidatorComponent } from './console/xml-validator/xml-validator.component';
import { XmlValidatorService } from './Services/xml-validator.service';

@NgModule({
  declarations: [
    AppComponent,
    JsonValidatorComponent,
    JsonBeautifierComponent,
    HomeComponent,
    XmlValidatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [JsonValidationService, XmlValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
