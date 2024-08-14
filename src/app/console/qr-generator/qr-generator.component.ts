import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { QrGeneratorService } from 'src/app/Services/qr-generator.service';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  showScanner: boolean = false;

  @ViewChild('qrcode', { static: false }) qrcode: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    private qrService: QrGeneratorService,
    private snackBar: MatSnackBar
  ) {
    this.qrResultString = '';
  }

  ngOnInit() {
    this.qrData = '';
    this.showQRCode = false; // Initially hide QR code
  }

  generateQRCode() {
    this.qrData = this.qrService.processData(this.qrData);
    if(this.qrData)
    {
      this.showQRCode = true; // Show QR code after button click
    }
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

  onCodeResult(result: Result) {
    this.qrResultString = result.getText();
  }

  onScanError(error: any) {
    console.error('QR Code Scan Error:', error);
  }

  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.readQRCodeFromFile(file);
    }
  }

  private readQRCodeFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imageData = event.target.result;
      this.decodeQRCodeFromImage(imageData);
    };
    reader.readAsDataURL(file);
  }

  private decodeQRCodeFromImage(imageData: string) {
    const img = new Image();
    img.src = imageData;

    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        // Decode from image element
        const result = await codeReader.decodeFromImage(img);
        this.qrResultString = result.getText();
      } catch (error) {
        console.error('Error decoding QR code:', error);
        this.qrResultString = 'Failed to decode QR code.';
      }
    };
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.qrResultString;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }
}
