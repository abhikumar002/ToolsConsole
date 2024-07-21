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

@NgModule({
  declarations: [
    AppComponent,
    JsonValidatorComponent,
    JsonBeautifierComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [JsonValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
