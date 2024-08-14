import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { QrGeneratorService } from 'src/app/Services/qr-generator.service';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent implements OnInit {

  qrData: string = '';
  showQRCode: boolean = false;
  qrResultString: string;
  selectedFile: File | null = null;
  qrCodeValue: string = 'Your QR Code Value';

  @ViewChild('qrcode', { static: false }) qrcode: ElementRef;

  constructor(
    private qrService: QrGeneratorService
  ) {
    this.qrResultString = '';
   }

  ngOnInit() {
    this.qrData = '';
    this.showQRCode = false; // Initially hide QR code
  }

  generateQRCode() {
    this.qrData = this.qrService.processData(this.qrData);
    this.showQRCode = true; // Show QR code after button click
  }

  onTextChange() {
    this.showQRCode = false; // Hide QR code when text changes
  }

  downloadQRCode() {
    const qrCodeElement = document.getElementById('qrcodeElement');
    if (qrCodeElement) {
      const imgElement = qrCodeElement.querySelector('img');
      if (imgElement) {
        const image = imgElement.src;
        const link = document.createElement('a');
        link.href = image;
        link.download = 'qrcode.png';
        link.click();
      }
    }
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

}
