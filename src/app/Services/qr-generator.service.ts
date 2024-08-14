import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrGeneratorService {

  constructor() { }

  processData(data: string): string {
    if (data.length > 2400) {
      alert('The amount of data is too big to be stored in a QR Code. Please reduce the data to 2400 characters or less.');
      return '';
    }
    return data.trim();
  }
}
