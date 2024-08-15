import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarcodeGeneratorService {

  constructor() { }

  generateBarcode(data: string): string {
    // Logic to generate barcode data (can be a base64 string, etc.)
    return data;
  }
}
