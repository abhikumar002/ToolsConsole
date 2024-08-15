import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { BarcodeGeneratorService } from 'src/app/Services/barcode-generator.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/library';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-barcode-generator',
  templateUrl: './barcode-generator.component.html',
  styleUrls: ['./barcode-generator.component.scss']
})
export class BarcodeGeneratorComponent implements OnInit {

  ngOnInit() {
  }

  barcodeData: string = '';
  showQRCode: boolean = false;
  generatedBarcode: string = '';
  scannedResult: string = '';
  barcodeReader = new BrowserMultiFormatReader();

  @ViewChild('barcodeElement', { static: false }) barcodeElement: ElementRef;

  constructor(
    private barcodeService: BarcodeGeneratorService,
    private snackBar: MatSnackBar
  ) {
    this.barcodeReader = new BrowserMultiFormatReader();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageSrc = e.target.result;
        this.decodeBarcodeFromImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  }

  async decodeBarcodeFromImage(imageSrc: string) {
    try {
      const result = await this.barcodeReader.decodeFromImage(undefined, imageSrc);
      this.scannedResult = result.getText();
    } catch (err) {
      console.error('Error decoding barcode:', err);
      this.scannedResult = 'Error decoding barcode';
    }
  }

  generateBarcode() {
    this.generatedBarcode = this.barcodeService.generateBarcode(this.barcodeData);
    if(this.generatedBarcode)
      {
        this.showQRCode = true; // Show QR code after button click
      }
  }

  onTextChange() {
    this.generatedBarcode = '';
    this.showQRCode = false; // Hide QR code when text changes
  }

  onScanSuccess(result: string) {
    this.scannedResult = result;
  }

  downloadBarcode() {
    const svgElement = this.barcodeElement.nativeElement.querySelector('svg');
    if (svgElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const imgURI = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

        const link = document.createElement('a');
        link.href = imgURI;
        link.download = 'barcode.png';
        link.click();
      };

      img.src = url;
    }
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.scannedResult;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }
}

