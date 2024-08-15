import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToJsonValidator() {
    this.router.navigate(['/json-validator']);
  }

  navigateToXmlValidator() {
    this.router.navigate(['/xml-validator']);
  }

  navigateToPasswordGenerator() {
    this.router.navigate(['/password-generator']);
  }

  navigateTobaseEncoderDecoder() {
    this.router.navigate(['/base-encoder-decoder']);
  }

  navigateToQRGenerator() {
    this.router.navigate(['/qr-generator']);
  }

  navigateTobarcodeGenerator() {
    this.router.navigate(['/barcode-generator']);
  }
}
